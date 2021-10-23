pragma solidity 0.8.2;
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract Hito {
 
    struct MEILENSTEIN {
        uint256 id;
        uint256 price;
        uint256 votestart;
        uint256 voteSum;
        uint256 voteYes;
        bool claimed;
    }
    
    struct POD {
        address creator;
        string hash;
        uint128 id_start;
        uint128 id_end;
        uint128 maxBuy;
        uint128 votePeriod; //in minutes for test
        uint256 salestart;
        uint256 latestMeilenstein;
        uint256 price;
        MEILENSTEIN[] meilensteine;
    }
    
    mapping(address => POD) public pods;
    mapping(address => mapping(uint256 => mapping(address => uint256))) public voted; // pod => meilenstein => user => votedBalance
    address[] public podList;
    address public owner;
    mapping(address => uint256) public balances;
    IERC20 dai;
    
    modifier canVote(address pod) {
        IERC721 token = IERC721(pod);
        require(token.balanceOf(msg.sender) > 0, 'user is not allowed to vote');
        uint256 latestMeilenstein = getLatesteilenstein(pod);
        require(voted[pod][latestMeilenstein][msg.sender] == 0, 'user already voted'); // check if the user has already voted
        uint256 timestamp = block.timestamp;
        require(pods[pod].meilensteine[latestMeilenstein].votestart < timestamp 
        && timestamp < pods[pod].meilensteine[latestMeilenstein].votestart + (pods[pod].votePeriod * 1 minutes), 'vote is not active');
        _;
    }
    
    constructor() {
        owner = msg.sender;
        dai = '0x';
    }
    
    function addPod(address token, string memory hash, uint128 id_start, uint128 id_end, uint128 maxBuy, uint128 votePeriod, uint256 price, uint256 salestart, MEILENSTEIN[] memory meilensteine) public returns(bool) {
        require(pods[token].salestart == 0, 'pod already exist');
        
        bool approvedForAll = IERC721(token).isApprovedForAll(msg.sender, address(this));
        
        for(uint256 i = id_start; i <= id_end; i++) {
            if(!approvedForAll) {
                require(IERC721(token).getApproved(i) == address(this), 'hito contract is not allowed to transfer token');
            }
            IERC721(token).transferFrom(msg.sender, address(this), i);
        }
        
        pods[token].creator = msg.sender;
        pods[token].hash = hash;
        pods[token].id_start = id_start;
        pods[token].id_end = id_end;
        pods[token].maxBuy = maxBuy;
        pods[token].votePeriod = votePeriod;
        pods[token].price = price;
        pods[token].salestart = salestart;
        pods[token].latestMeilenstein = 0;
        
        for(uint i = 0; i < meilensteine.length; i++) {
            pods[token].meilensteine.push(meilensteine[i]);
        }
        podList.push(token);
        
        return true;
    }
    
    function vote(address pod, bool usersVote) public canVote(pod) {
        uint256 latestMeilenstein = getLatesteilenstein(pod);
        uint256 balance = IERC721(pod).balanceOf(msg.sender);
        addVote(pod, latestMeilenstein, balance);
        pods[pod].meilensteine[latestMeilenstein].voteSum += balance;
        if(usersVote) {
            pods[pod].meilensteine[latestMeilenstein].voteYes += balance;
        }
    }
    
    function buy(address token, uint256 amount) public {
        IERC721 t721 = IERC721(token)
        POD pod = pods[token];
        require(amount <= pod.maxBuy, 'amount to high');
        require(dai.allowance(msg.sender, address(this)) >= amount*pod.price,'contract is not allowed to transfer users funds');
        require(t721.balanceOf(address(this)) >= amount,'not enough token left');
        dai.transferFrom(msg.sender, address.this, amount*pod.price);
        
        for(int i = pod.id_start; i < pod.id_start + amount; i++ ) {
            t721.transfer(msg.sender,i);
        }

        pods[token].id_start += amount;
    }

    function addVote(address pod, uint256 latestMeilenstein, uint256 amount) internal {
        voted[pod][latestMeilenstein][msg.sender] = amount;
    }

    function getLatesteilenstein(address pod) public view returns(uint256) {
        return pods[pod].latestMeilenstein;
    }
    
    function getPod(address token) public view returns(POD memory) {
        return(pods[token]);
    }
    
    function getPodList() public view returns(address[] memory) {
        return podList;
    }
    
    function getFullPodList() public view returns(POD[] memory) {
        POD[] memory result = new POD[](podList.length);
        for(uint256 i = 0; i < podList.length; i++) {
            result[i] = pods[podList[i]];
        }
        return result;
    }
    
    function getTimestamp() public view returns(uint) {
        return block.timestamp;
    }

}
