const { expect } = require("chai");
const { ethers } = require("hardhat");
const { utils } = require("ethers");
const { inputToConfig } = require("@ethereum-waffle/compiler");

describe("HITO CONTRACT", function () {
  let hitoFactory, tokenFactory;
  let hito, dai, token;
  let owner, wallet1, wallet2;

  beforeEach(async () => {
    [owner, wallet1, wallet2, _] = await ethers.getSigners();


    tokenFactory = await ethers.getContractFactory('Token');

    token = await tokenFactory.deploy('VaskeMerbeth', 'VAME', 1000);
    dai = await tokenFactory.deploy('DAI Stable', 'DAI', 1000);

    hitoFactory = await ethers.getContractFactory('Hito');
    hito = await hitoFactory.deploy(dai.address);
  })


  describe('Deployment', async () => {
    it('should have the correct owner', async () => {
      console.log('\n    hito address: ' + await hito.address + '\n');
      expect(await hito.owner()).to.equal(owner.address)
    })
    it('owner should have 1000 VAME token', async () => {
      expect(await token.balanceOf(owner.address)).to.equal(ethers.utils.parseEther('1000'));
    })
    it('owner should have 1000 dai token', async () => {
      expect(await dai.balanceOf(owner.address)).to.equal(ethers.utils.parseEther('1000'));
    })
  })

  describe('Pods', async () => {
    beforeEach(async () => {
      await token.approve(hito.address, ethers.utils.parseEther('1000'));
      await dai.transfer(wallet1.address, ethers.utils.parseEther('100'));
      await dai.connect(wallet1).approve(hito.address, ethers.utils.parseEther('1000'));
      let datum = Date.now() / 1000 + 60;
      await hito.addPod(
        token.address,
        ethers.utils.parseEther('1000').toString(),
        'ETHLisbon',
        '0xSomeHash',
        ethers.utils.parseEther('0.25').toString(),
        1,
        [
          { id: 0, hash: '0xHash', meilensteinDate: (datum).toFixed(0) },
          { id: 1, hash: '0xHash', meilensteinDate: (Date.now() / 1000 + 2 * 60).toFixed(0) },
          { id: 2, hash: '0xHash', meilensteinDate: (Date.now() / 1000 + 3 * 60).toFixed(0) },
        ]
      )
    })
    it('should create new pod', async () => {
      expect((await hito.getPodList()).length).to.equal(1);
    })

    it('pod should have 1000 VAME token', async () => {
      expect(await token.balanceOf(hito.address)).to.equal(ethers.utils.parseEther('1000'));
    })

    it('wallet1 should have 100 dai token', async () => {
      expect(await dai.balanceOf(wallet1.address)).to.equal(ethers.utils.parseEther('100'));
    })

    
    it('should deposit money', async () => {
      await hito.connect(wallet1).deposit(token.address, ethers.utils.parseEther('10'));
      expect(await hito.connect(wallet1).getLatestAmount(token.address)).to.equal(ethers.utils.parseEther('10'))
    })

  })



  // describe('Pods', async () => {
  //   beforeEach(async () => {
  //     await token.setApprovalForAll(hito.address, true);
  //     await hito.addPod(                 // hash                   id_start, id_end, maxBuy, voteperiod, price,   sale start 
  //       token.address, 'QmNWEEuxdugy7xxbmViU42TSr9SCkD2AyNgxGp67FrkZ9k',  1,  1000,   10,        5,      200000,  1635067381,
  //     [{id: 1, price: 2000000, votestart: 1635067381, voteSum: 0, voteYes: 0},{id: 2, price: 2000000, votestart: 1635067381, voteSum: 0, voteYes: 0} ]
  //     );
  //   })

  //   it('should create new pod', async () => {
  //     expect((await hito.getPodList()).length).to.equal(1);
  //   })

  //   it('pod should have 1000 VAME token', async() => {
  //     expect(await token.balanceOf(hito.address)).to.equal(1000);
  //   })

  // })
})