const { expect } = require("chai");
const { ethers } = require("hardhat");
const { utils } = require("ethers");
const { inputToConfig } = require("@ethereum-waffle/compiler");

describe("HITO CONTRACT", function () {
  let hitoFactory, tokenFactory;
  let hito, token;
  let owner, wallet1, wallet2;
  beforeEach(async () => {
    [owner, wallet1, wallet2, _] = await ethers.getSigners();

    hitoFactory = await ethers.getContractFactory('Hito');
    hito = await hitoFactory.deploy();

    tokenFactory = await ethers.getContractFactory('VAME');
    token = await tokenFactory.deploy('VaskeMerbeth', 'VAME', 1000);
  })


  describe('Deployment', async () => {
    it('should have the correct owner', async () => {
      console.log('\n    hito address: '+await hito.address+'\n');
      expect(await hito.owner()).to.equal(owner.address)
    })
    it('owner should have 1000 VAME token', async () => {
      expect(await token.balanceOf(owner.address)).to.equal(1000);
    })
  })

  describe('Pods', async () => {
    beforeEach(async () => {
      await token.setApprovalForAll(hito.address, true);
      await hito.addPod(                 // hash                   id_start, id_end, maxBuy, voteperiod, price,   sale start 
        token.address, 'QmNWEEuxdugy7xxbmViU42TSr9SCkD2AyNgxGp67FrkZ9k',  1,  1000,   10,        5,      200000,  1635067381,
      [{id: 1, price: 2000000, votestart: 1635067381, voteSum: 0, voteYes: 0},{id: 2, price: 2000000, votestart: 1635067381, voteSum: 0, voteYes: 0} ]
      );
    })

    it('should create new pod', async () => {
      expect((await hito.getPodList()).length).to.equal(1);
    })

    it('pod should have 1000 VAME token', async() => {
      expect(await token.balanceOf(hito.address)).to.equal(1000);
    })

  })
})