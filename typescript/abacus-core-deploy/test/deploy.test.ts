import '@nomiclabs/hardhat-waffle';
import { ethers } from 'hardhat';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { types } from '@abacus-network/utils';

import { ChainConfig } from '../src/types';
import { CoreConfig } from '../src/core/types';
import { CoreDeploy } from '../src/core/CoreDeploy';

/*
 * Deploy the full Abacus suite on three chains
 */
describe('CoreDeploy', async () => {
  let signer: SignerWithAddress;

  before(async () => {
    [signer] = await ethers.getSigners();
  });

  describe('three domain deploy', async () => {
    it('deploys', async () => {
      const domains = [1000, 2000, 3000];
      const chains: Record<types.Domain, ChainConfig> = {};
      const validators: Record<string, types.Address> = {};
      const overrides = {};
      for (const domain of domains) {
        chains[domain] = { name: domain.toString(), domain, signer, overrides };
        validators[chains[domain].name] = await signer.getAddress();
      }
      const config: CoreConfig = {
        processGas: 850_000,
        reserveGas: 15_000,
        validators,
        test: true,
      };
      const core = new CoreDeploy();
      await core.deploy(chains, config);
    });
  });
});
