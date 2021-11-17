const { expect } = require("chai");
const { ethers } = require("hardhat");
const { utils } = require("ethers");

describe("TokenSale contract", function () {
  let tokenFactory, tokenSaleFactory;
  let exchangeToken, currency, tokenSale;
  let owner, wallet1, wallet2;
  let initSupply = utils.parseUnits('1000000', 'ether');
  let balance = utils.parseUnits('1000', 'ether');
  let purchaseMinimum = utils.parseUnits('100', 'ether');
  let exchangeRate = 100;


  beforeEach(async () => {
    [owner, wallet1, wallet2, _] = await ethers.getSigners();

    tokenFactory = await ethers.getContractFactory('StandardToken');
    exchangeToken = await tokenFactory.deploy('ExchangeToken', 'EXC', initSupply);
    currency = await tokenFactory.deploy('Currency', 'CUR', initSupply);

    tokenSaleFactory = await ethers.getContractFactory('TokenSale');
    tokenSale = await tokenSaleFactory.deploy(
      'TokenSaleTest',
      '1',
      currency.address,
      exchangeToken.address,
      exchangeRate,
      purchaseMinimum
    );

    await currency.transfer(wallet1.address, balance);
    await currency.transfer(wallet2.address, balance);
    await exchangeToken.transfer(tokenSale.address, balance);
  });

  describe('Deployment', () => {
    it('should have the correct owner', async () => {
      expect(await tokenSale.getOwner()).to.equal(owner.address);
    });

    it('should have the correct currency balance at owners wallet', async () => {
      expect(await currency.balanceOf(owner.address)).to.equal(initSupply.sub(balance.add(balance)));
    });
    it('should have the correct currency balance at wallet1', async () => {
      expect(await currency.balanceOf(wallet1.address)).to.equal(balance);
    });
    it('should have the correct currency balance at wallet2', async () => {
      expect(await currency.balanceOf(wallet2.address)).to.equal(balance);
    });
    it('should have the correct currency balance at tokenSale contract', async () => {
      expect(await currency.balanceOf(tokenSale.address)).to.equal(0);
    });

    it('should have the correct exchangeToken balance at owners wallet', async () => {
      expect(await exchangeToken.balanceOf(owner.address)).to.equal(initSupply.sub(balance));
    });
    it('should have the correct exchangeToken balance at wallet1', async () => {
      expect(await exchangeToken.balanceOf(wallet1.address)).to.equal(0);
    });
    it('should have the correct exchangeToken balance at wallet2', async () => {
      expect(await exchangeToken.balanceOf(wallet2.address)).to.equal(0);
    });
    it('should have the correct exchangeToken balance at tokenSale contract', async () => {
      expect(await exchangeToken.balanceOf(tokenSale.address)).to.equal(balance);
    });

    it('should have the corrent exchange rate', async () => {
      expect(await tokenSale.getExchangeRate()).to.equal(exchangeRate);
    });
    it('should have the correct currency address', async () => {
      expect(await tokenSale.getCurrencyAddress()).to.equal(currency.address);
    });
    it('should have the correct exchange token address', async () => {
      expect(await tokenSale.getExchangeTokenAddress()).to.equal(exchangeToken.address);
    });
    it('should have an empty buyers list', async () => {
      expect((await tokenSale.getBuyersList()).length).to.equal(0);
    });
    it('should have zero tokens sold', async () => {
      expect(await tokenSale.getSoldExchangeTokenAmount()).to.equal(0);
    });
    it('should have the correct purchase minimum', async () => {
      expect(await tokenSale.getPurchaseMinimum()).to.equal(purchaseMinimum);
    });
  });

  describe('Inactive Sale', () => {
    it('should fail to buy exchangeToken when sale inactive', async () => {
      await currency.connect(wallet1).approve(tokenSale.address, balance);
      await expect(tokenSale.connect(wallet2).buy(balance, balance)).to.be.revertedWith('sale is currently inactive')
    })
  });

  describe('Active Sale', () => {
    let tokenAmount = utils.parseUnits('100', 'ether');

    beforeEach(async () => {
      await tokenSale.setSaleActive();
    })
    it('should have an active sale', async () => {
      expect(await tokenSale.getSaleActive()).to.equal(true);
    })
    it('should get the correct amount of exchangeTokens to buy', async () => {
      expect(await tokenSale.getAmountOfExchangeToken(tokenAmount)).to.equal(tokenAmount);
    });

    describe('Without user allowance', () => {
      it('should fail without allowance', async () => {
        await expect(tokenSale.connect(wallet1).buy(tokenAmount, tokenAmount)).to.be.revertedWith('contract is not allowed to transfer users funds');
      })
    })

    describe('With user allowance', () => {
      beforeEach(async () => {
        await currency.connect(wallet1).approve(tokenSale.address, balance);
        await currency.connect(wallet2).approve(tokenSale.address, balance.add(balance));
        await tokenSale.connect(wallet1).buy(tokenAmount, tokenAmount);
      });
      it('should receive the expected amount of exchange token', async () => {
        expect(await exchangeToken.balanceOf(wallet1.address)).to.equal(tokenAmount);
      });
      it('should have the correct currency balance at tokenSale contract', async () => {
        expect(await currency.balanceOf(tokenSale.address)).to.equal(tokenAmount);
      });
      it('should have the correct exchangeToken balance at tokenSale contract', async () => {
        expect(await exchangeToken.balanceOf(tokenSale.address)).to.equal(balance.sub(tokenAmount));
      });

      it('should have the correct buyers list legth after 1 purchase', async () => {
        expect((await tokenSale.getBuyersList()).length).to.equal(1);
      });
      it('should have the correct address in buyers list after 1 purchase', async () => {
        expect((await tokenSale.getBuyersList())[0]).to.equal(wallet1.address);
      });
      it('should have the correct buyers list legth after 2 purchases', async () => {
        await tokenSale.connect(wallet2).buy(tokenAmount, tokenAmount);
        expect((await tokenSale.getBuyersList()).length).to.equal(2);
      });
      it('should have the correct address in buyers list after 2 purchases', async () => {
        await tokenSale.connect(wallet2).buy(tokenAmount, tokenAmount);
        expect((await tokenSale.getBuyersList())[1]).to.equal(wallet2.address);
      });
      it('should have the correct buyers list length after 3 purchases from two wallets', async () => {
        await tokenSale.connect(wallet2).buy(tokenAmount, tokenAmount);
        await tokenSale.connect(wallet1).buy(tokenAmount, tokenAmount);
        expect((await tokenSale.getBuyersList()).length).to.equal(2);
      });
      it('should fail when amount of tokens to buy is below purchase minimum', async () => {
        await expect(tokenSale.connect(wallet1).buy(tokenAmount, purchaseMinimum.sub(1))).to.be.revertedWith('the user tries to buy too few tokens')
      });
      it('should fail with wrong price ratio (wrong currency amount)', async () => {
        await expect(tokenSale.connect(wallet1).buy(tokenAmount, purchaseMinimum.sub(1))).to.be.revertedWith('the user tries to buy too few tokens')
      });
      it('should fail with wrong price ratio (too much currency)', async () => {
        await expect(tokenSale.connect(wallet1).buy(tokenAmount.add(5), tokenAmount)).to.be.revertedWith('wrong amount of exchange token for given price')
      });
      it('should fail with wrong price ratio (not enough currency)', async () => {
        await expect(tokenSale.connect(wallet1).buy(tokenAmount.sub(5), tokenAmount)).to.be.revertedWith('wrong amount of exchange token for given price')
      });
      it('should fail with wrong price ratio (too much exchangeToken)', async () => {
        await expect(tokenSale.connect(wallet1).buy(tokenAmount, tokenAmount.add(5))).to.be.revertedWith('wrong amount of exchange token for given price')
      });
      it('should fail with wrong price ratio (not enough exchangeToken)', async () => {
        await expect(tokenSale.connect(wallet1).buy(tokenAmount.add(5), tokenAmount)).to.be.revertedWith('wrong amount of exchange token for given price')
      });
      it('should fail when users currency balance is too low', async () => {
        await currency.connect(wallet2).transfer(owner.address, utils.parseUnits('800', 'ether'));
        let currentBalance = await currency.balanceOf(wallet2.address);
        await expect(tokenSale.connect(wallet2).buy(currentBalance.add(5), currentBalance.add(5))).to.be.revertedWith('user has not enough funds')
      });
      it('should fail when user tries to buy too much exchange token', async () => {
        await expect(tokenSale.buy(balance.add(5), balance.add(5))).to.be.revertedWith('not enough exchangeToken left :(')
      });
      it('should pass with exchangeRate: 50 (100 currency : 50 exchangeToken)', async () => {
        tokenSale.setExchangeRate(50);
        let shouldReceive = await tokenSale.getAmountOfExchangeToken(balance);
        let oldBalance = await exchangeToken.balanceOf(wallet2.address);
        await tokenSale.connect(wallet2).buy(balance, shouldReceive);
        expect(await exchangeToken.balanceOf(wallet2.address)).to.equal(oldBalance.add(shouldReceive));
      });
      it('should pass with exchangeRate: 120 (100 currency : 120 exchangeToken)', async () => {
        tokenSale.setExchangeRate(120);
        let shouldReceive = await tokenSale.getAmountOfExchangeToken(balance.div(2));
        let oldBalance = await exchangeToken.balanceOf(wallet2.address);
        await tokenSale.connect(wallet2).buy(balance.div(2), shouldReceive);
        expect(await exchangeToken.balanceOf(wallet2.address)).to.equal(oldBalance.add(shouldReceive));
      });
      it('should pass with exchangeRate: 200 (100 currency : 200 exchangeToken)', async () => {
        tokenSale.setExchangeRate(200);
        let shouldReceive = await tokenSale.getAmountOfExchangeToken(balance.div(3));
        let oldBalance = await exchangeToken.balanceOf(wallet2.address);
        await tokenSale.connect(wallet2).buy(balance.div(3), shouldReceive);
        expect(await exchangeToken.balanceOf(wallet2.address)).to.equal(oldBalance.add(shouldReceive));
      });
      it('should fail with exchangeRate: 0 (100 currency : 0 exchangeToken', async () => {
        tokenSale.setExchangeRate(0);
        let shouldReceive = await tokenSale.getAmountOfExchangeToken(balance.div(3));
        await expect(tokenSale.connect(wallet2).buy(balance.div(3), shouldReceive)).to.be.revertedWith('the user tries to buy too few tokens');
      });
    });
  });

  describe('Owner functions', () => {
    let tokenAmount = utils.parseUnits('100', 'ether');
    beforeEach(async () => {
      await tokenSale.setSaleActive();
      await currency.connect(wallet1).approve(tokenSale.address, balance);
      await tokenSale.connect(wallet1).buy(tokenAmount, tokenAmount);
    });

    it('should reverted when user calls setOwner', async () => {
      await expect(tokenSale.connect(wallet2).setOwner(wallet1.address)).to.be.revertedWith('msg.sender is not authorized')
    })
    it('should reverted when user calls setExchangeRate', async () => {
      await expect(tokenSale.connect(wallet2).setExchangeRate(20)).to.be.revertedWith('msg.sender is not authorized')
    })
    it('should reverted when user calls withdrawCurrency', async () => {
      await expect(tokenSale.connect(wallet2).withdrawCurrency(wallet1.address, 1)).to.be.revertedWith('msg.sender is not authorized')
    })
    it('should reverted when user calls withdrawAllCurrency', async () => {
      await expect(tokenSale.connect(wallet2).withdrawAllCurrency(wallet1.address)).to.be.revertedWith('msg.sender is not authorized')
    })
    it('should reverted when user calls withdrawExchangeToken', async () => {
      await expect(tokenSale.connect(wallet2).withdrawExchangeToken(wallet1.address, 1)).to.be.revertedWith('msg.sender is not authorized')
    })
    it('should reverted when user calls withdrawAllExchangeTokens', async () => {
      await expect(tokenSale.connect(wallet2).withdrawAllExchangeTokens(wallet1.address)).to.be.revertedWith('msg.sender is not authorized')
    })
    it('should reverted when user calls setSaleActive', async () => {
      await expect(tokenSale.connect(wallet2).setSaleActive()).to.be.revertedWith('msg.sender is not authorized')
    })
    it('should reverted when user calls setSaleInActive', async () => {
      await expect(tokenSale.connect(wallet2).setSaleInActive()).to.be.revertedWith('msg.sender is not authorized')
    })
    it('should reverted when user calls setMinAmount', async () => {
      await expect(tokenSale.connect(wallet2).setMinAmount(1)).to.be.revertedWith('msg.sender is not authorized')
    })

    it('should pass when owner calls setOwner', async () => {
      await tokenSale.setOwner(wallet1.address)
      expect(await tokenSale.getOwner()).to.equal(wallet1.address);
    })
    it('should pass when owner calls setExchangeRate', async () => {
      await tokenSale.setExchangeRate(100);
      expect(await tokenSale.getExchangeRate()).to.equal(100);
    });
    it('should pass when owner calls withdrawCurrency', async () => {
      let oldBalance = await currency.balanceOf(owner.address);
      let contractBalance = await currency.balanceOf(tokenSale.address)
      await tokenSale.withdrawCurrency(owner.address, contractBalance)
      expect(await currency.balanceOf(owner.address)).to.equal(oldBalance.add(contractBalance));
    })
    it('should pass when owner calls withdrawAllCurrency', async () => {
      let oldBalance = await currency.balanceOf(owner.address);
      let contractBalance = await currency.balanceOf(tokenSale.address)
      await tokenSale.withdrawAllCurrency(owner.address)
      expect(await currency.balanceOf(owner.address)).to.equal(oldBalance.add(contractBalance));
    })
    it('should pass when owner calls withdrawExchangeToken', async () => {
      let oldBalance = await exchangeToken.balanceOf(owner.address);
      let contractBalance = await exchangeToken.balanceOf(tokenSale.address)
      await tokenSale.withdrawExchangeToken(owner.address, contractBalance)
      expect(await exchangeToken.balanceOf(owner.address)).to.equal(oldBalance.add(contractBalance));
    })
    it('should pass when owner calls withdrawAllExchangeTokens', async () => {
      let oldBalance = await exchangeToken.balanceOf(owner.address);
      let contractBalance = await exchangeToken.balanceOf(tokenSale.address)
      await tokenSale.withdrawAllExchangeTokens(owner.address)
      expect(await exchangeToken.balanceOf(owner.address)).to.equal(oldBalance.add(contractBalance));
    })
    it('should pass when owner calls setSaleActive', async () => {
      await tokenSale.setSaleActive();
      expect(await tokenSale.getSaleActive()).to.equal(true);
    })
    it('should pass when owner calls setSaleInActive', async () => {
      await tokenSale.setSaleInActive()
      expect(await tokenSale.getSaleActive()).to.equal(false);
    })
    it('should pass when owner calls setMinAmount', async () => {
      await tokenSale.setOwner(wallet1.address)
      expect(await tokenSale.getOwner()).to.equal(wallet1.address);
    })
  });

});