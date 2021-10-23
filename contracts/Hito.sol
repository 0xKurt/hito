pragma solidity 0.8.2;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

interface aaveMin {
    function deposit(address asset, uint256 amount, address onBehalfOf, uint16 referralCode) external;
    function withdraw(address asset, uint256 amount, address to) external;
}

contract Hito {
 
    struct MEILENSTEIN {
        uint256 id;
        string hash;
        uint256 meilensteinDate;
    }
    
    struct POD {
        address creator;
        string name;
        string hash;
        uint256 amount;
        uint256 latestMeilenstein;
        uint256 fundingPeriod;
        uint256 start;
        MEILENSTEIN[] meilensteine;
    }
    
    mapping(address => POD) public pods;
    address[] public podList;
    address public owner;
    mapping(address => uint256) public podBalances;
    mapping(address => mapping(address => mapping(uint256 => uint256))) public userBalances;  // user => pod => meilenstein => dai balance
    
    IERC20 dai;
    aaveMin lend;

    constructor(address paymentToken, address aave) {
        owner = msg.sender;
        dai = IERC20(paymentToken);
        lend = aaveMin(aave);
    }
    
    modifier isFundingPhase(address pod) {
        POD memory p = pods[pod];
        require(p.meilensteine[p.latestMeilenstein].meilensteinDate >= block.timestamp, 'funding phase not active');
        require(p.meilensteine[p.latestMeilenstein].meilensteinDate + p.fundingPeriod >= block.timestamp, 'funding phase not active.');
        _;
    }
    
    function addPod(address token, uint256 tokenSupply, string memory name, string memory hash, uint256 amount, uint256 fundingPeriod, MEILENSTEIN[] memory meilensteine) public returns(bool) {
        require(IERC20(token).allowance(msg.sender, address(this)) >= tokenSupply, 'allowance not set');
        require(IERC20(token).balanceOf(msg.sender) >= tokenSupply, 'user has not enough token');
        
        IERC20(token).transferFrom(msg.sender, address(this), tokenSupply);
        pods[token].creator = msg.sender;
        pods[token].name = name;
        pods[token].hash = hash;
        pods[token].amount = amount;
        pods[token].fundingPeriod = fundingPeriod * 1 minutes;
        pods[token].start = block.timestamp;
        pods[token].latestMeilenstein = 0;
        
        for(uint i = 0; i < meilensteine.length; i++) {
            pods[token].meilensteine.push(meilensteine[i]);
        }
        
        podList.push(token);
        
        return true;
    }
    
    function deposit(address pod, uint256 amount) public isFundingPhase(pod) returns(uint256 tokenAmount) {
        POD memory p = pods[pod];
        checkMeilenstein(pod);
        require(p.latestMeilenstein != p.meilensteine.length, 'latest milestone reached');
        require(dai.allowance(msg.sender, address(this)) >= amount, 'contract is not allowed to tranfser users funds');
        dai.transferFrom(msg.sender, address(this), amount);
        lend.deposit(address(dai), amount, address(this), 0);                                                                // add aave here
        podBalances[pod] += amount;
        userBalances[msg.sender][pod][p.latestMeilenstein] += amount;
        return amount * p.amount;
    }

    function withdraw(address pod) public isFundingPhase(pod) returns(uint256) {
        checkMeilenstein(pod);
        POD memory p = pods[pod];
        require(p.latestMeilenstein > 0, 'cannot withdraw in first funding phase');
        uint256 toMeilenstein;
        
        if(p.latestMeilenstein == p.meilensteine.length) {
            toMeilenstein = p.latestMeilenstein + 1;
        } else {
            toMeilenstein = p.latestMeilenstein;
        }
        
        uint256 amount;
        for(uint256 i = 0; i < toMeilenstein; i++) {
            amount += userBalances[msg.sender][pod][i];
            userBalances[msg.sender][pod][i] = 0;
        }

        podBalances[pod] -= amount;                                 // aave here
        lend.withdraw(address(dai), amount, msg.sender)
       // dai.transfer(msg.sender, amount);
        IERC20(pod).transfer(msg.sender, amount*p.amount);
    }
    
    function claimDai(address pod, uint256 amount) public {
      //  POD p = POD(pod);
        // calc aave dai balance - sum user dai balance and pay out
    }

    function checkMeilenstein(address pod) internal {
        POD memory p = pods[pod];
        if(block.timestamp >= p.meilensteine[p.latestMeilenstein + 1].meilensteinDate) {
            pods[pod].latestMeilenstein += 1;
        }
    }

    function getLatestMeilenstein(address pod) public view returns(uint256) {
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

    function getDate(address pod) public view returns(uint) {
        POD memory p = pods[pod];
        return p.meilensteine[p.latestMeilenstein].meilensteinDate + p.fundingPeriod;
    }
    
    function getLatestAmount(address pod) public view returns(uint256) {
        POD memory p = pods[pod];
        return userBalances[msg.sender][pod][p.latestMeilenstein];
    }
}
