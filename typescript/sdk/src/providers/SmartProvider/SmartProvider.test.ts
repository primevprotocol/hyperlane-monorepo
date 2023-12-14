/* eslint-disable no-console */
import { expect } from 'chai';
import { ethers } from 'ethers';

import { eqAddress } from '@hyperlane-xyz/utils';

import { chainMetadata } from '../../consts/chainMetadata';
import { ChainMetadata } from '../../metadata/chainMetadataTypes';

import { ProviderMethod } from './ProviderMethods';
import { HyperlaneSmartProvider } from './SmartProvider';

const MIN_BLOCK_NUM = 10000000;
const DEFAULT_ACCOUNT = '0x9d525E28Fe5830eE92d7Aa799c4D21590567B595';
const WETH_CONTRACT = '0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6';
const WETH_TRANSFER_TOPIC0 =
  '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef';
const WETH_TRANSFER_TOPIC1 =
  '0x0000000000000000000000004648a43b2c14da09fdf82b161150d3f634f40491';
const WETH_CALL_DATA =
  '0x70a082310000000000000000000000004f7a67464b5976d7547c860109e4432d50afb38e';
const TRANSFER_TX_HASH =
  '0x45a586f90ffd5d0f8e618f0f3703b14c2c9e4611af6231d6fed32c62776b6c1b';

const goerliRpcConfig = {
  ...chainMetadata.goerli.rpcUrls[0],
  pagination: {
    maxBlockRange: 1000,
    minBlockNumber: MIN_BLOCK_NUM,
  },
};
const justExplorersConfig: ChainMetadata = {
  ...chainMetadata.goerli,
  rpcUrls: [] as any,
};
const justRpcsConfig: ChainMetadata = {
  ...chainMetadata.goerli,
  rpcUrls: [goerliRpcConfig],
  blockExplorers: [],
};
const combinedConfig: ChainMetadata = {
  ...chainMetadata.goerli,
  rpcUrls: [goerliRpcConfig],
};
const configs: [string, ChainMetadata][] = [
  ['Just Explorers', justExplorersConfig],
  ['Just RPCs', justRpcsConfig],
  ['Combined configs', combinedConfig],
];

describe('SmartProvider', () => {
  let provider: HyperlaneSmartProvider;

  const itDoesIfSupported = (method: ProviderMethod, fn: () => any) => {
    it(method, () => {
      if (provider.supportedMethods.includes(method)) {
        return fn();
      }
    }).timeout(20_000);
  };

  for (const [description, config] of configs) {
    describe(description, () => {
      provider = HyperlaneSmartProvider.fromChainMetadata(config);

      itDoesIfSupported(ProviderMethod.GetBlock, async () => {
        const latestBlock = await provider.getBlock('latest');
        console.debug('Latest block #', latestBlock.number);
        expect(latestBlock.number).to.be.greaterThan(MIN_BLOCK_NUM);
        expect(latestBlock.timestamp).to.be.greaterThan(
          Date.now() / 1000 - 60 * 60 * 24,
        );
        const firstBlock = await provider.getBlock(1);
        expect(firstBlock.number).to.equal(1);
      });

      itDoesIfSupported(ProviderMethod.GetBlockNumber, async () => {
        const result = await provider.getBlockNumber();
        console.debug('Latest block #', result);
        expect(result).to.be.greaterThan(MIN_BLOCK_NUM);
      });

      itDoesIfSupported(ProviderMethod.GetGasPrice, async () => {
        const result = await provider.getGasPrice();
        console.debug('Gas price', result.toString());
        expect(result.toNumber()).to.be.greaterThan(0);
      });

      itDoesIfSupported(ProviderMethod.GetBalance, async () => {
        const result = await provider.getBalance(DEFAULT_ACCOUNT);
        console.debug('Balance', result.toString());
        expect(parseFloat(ethers.utils.formatEther(result))).to.be.greaterThan(
          1,
        );
      });

      itDoesIfSupported(ProviderMethod.GetCode, async () => {
        const result = await provider.getCode(WETH_CONTRACT);
        console.debug('Weth code snippet', result.substring(0, 12));
        expect(result.length).to.be.greaterThan(100);
      });

      itDoesIfSupported(ProviderMethod.GetStorageAt, async () => {
        const result = await provider.getStorageAt(WETH_CONTRACT, 0);
        console.debug('Weth storage', result);
        expect(result.length).to.be.greaterThan(20);
      });

      itDoesIfSupported(ProviderMethod.GetTransactionCount, async () => {
        const result = await provider.getTransactionCount(
          DEFAULT_ACCOUNT,
          'latest',
        );
        console.debug('Tx Count', result);
        expect(result).to.be.greaterThan(40);
      });

      itDoesIfSupported(ProviderMethod.GetTransaction, async () => {
        const result = await provider.getTransaction(TRANSFER_TX_HASH);
        console.debug('Transaction confirmations', result.confirmations);
        expect(result.confirmations).to.be.greaterThan(1000);
      });

      itDoesIfSupported(ProviderMethod.GetTransactionReceipt, async () => {
        const result = await provider.getTransactionReceipt(TRANSFER_TX_HASH);
        console.debug('Transaction receipt', result.confirmations);
        expect(result.confirmations).to.be.greaterThan(1000);
      });

      itDoesIfSupported(ProviderMethod.GetLogs, async () => {
        console.debug('Testing logs with no from/to range');
        const result1 = await provider.getLogs({
          address: WETH_CONTRACT,
          topics: [WETH_TRANSFER_TOPIC0, WETH_TRANSFER_TOPIC1],
        });
        console.debug('Logs found', result1.length);
        expect(result1.length).to.be.greaterThan(0);
        expect(eqAddress(result1[0].address, WETH_CONTRACT)).to.be.true;

        console.debug('Testing logs with small from/to range');
        const result2 = await provider.getLogs({
          address: WETH_CONTRACT,
          topics: [WETH_TRANSFER_TOPIC0],
          fromBlock: MIN_BLOCK_NUM,
          toBlock: MIN_BLOCK_NUM + 100,
        });
        expect(result2.length).to.be.greaterThan(0);
        expect(eqAddress(result2[0].address, WETH_CONTRACT)).to.be.true;

        console.debug('Testing logs with large from/to range');
        const result3 = await provider.getLogs({
          address: WETH_CONTRACT,
          topics: [WETH_TRANSFER_TOPIC0, WETH_TRANSFER_TOPIC1],
          fromBlock: MIN_BLOCK_NUM,
          toBlock: 'latest',
        });
        expect(result3.length).to.be.greaterThan(0);
        expect(eqAddress(result3[0].address, WETH_CONTRACT)).to.be.true;
      });

      itDoesIfSupported(ProviderMethod.EstimateGas, async () => {
        const result = await provider.estimateGas({
          to: DEFAULT_ACCOUNT,
          from: DEFAULT_ACCOUNT,
          value: 1,
        });
        expect(result.toNumber()).to.be.greaterThan(10_000);
      });

      itDoesIfSupported(ProviderMethod.Call, async () => {
        const result = await provider.call({
          to: WETH_CONTRACT,
          from: DEFAULT_ACCOUNT,
          data: WETH_CALL_DATA,
        });
        expect(result).to.equal(
          '0x0000000000000000000000000000000000000000000000000000000000000000',
        );
      });

      it('Handles parallel requests', async () => {
        const result1Promise = provider.getLogs({
          address: WETH_CONTRACT,
          topics: [WETH_TRANSFER_TOPIC0],
          fromBlock: MIN_BLOCK_NUM,
          toBlock: MIN_BLOCK_NUM + 100,
        });
        const result2Promise = provider.getBlockNumber();
        const result3Promise = provider.getTransaction(TRANSFER_TX_HASH);
        const [result1, result2, result3] = await Promise.all([
          result1Promise,
          result2Promise,
          result3Promise,
        ]);
        expect(result1.length).to.be.greaterThan(0);
        expect(result2).to.be.greaterThan(0);
        expect(!!result3).to.be.true;
      }).timeout(10_000);
    });

    it('Reports as healthy', async () => {
      const result = await provider.isHealthy();
      expect(result).to.be.true;
    });
  }
});
