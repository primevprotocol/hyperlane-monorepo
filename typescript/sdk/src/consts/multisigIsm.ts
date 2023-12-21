import { MultisigConfig } from '../ism/types';
import { ChainMap } from '../types';

export const defaultMultisigConfigs: ChainMap<MultisigConfig> = {
  alfajores: {
    threshold: 2,
    validators: [
      '0x2233a5ce12f814bd64c9cdd73410bb8693124d40',
      '0xba279f965489d90f90490e3c49e860e0b43c2ae6',
      '0x86485dcec5f7bb8478dd251676372d054dea6653',
    ],
  },

  arbitrum: {
    threshold: 3,
    validators: [
      '0x4d966438fe9e2b1e7124c87bbb90cb4f0f6c59a1',
      '0xec68258a7c882ac2fc46b81ce80380054ffb4ef2', // dsrv
      '0x5450447aee7b544c462c9352bef7cad049b0c2dc', // zeeprime
      '0x092e1c19da58e87ea65198785ee83867fe4bb418', // everstake
      // '0xc2d68e109a7e80e12098d50ac4ef9fa7b3061684', // staked (not yet announced)
    ],
  },

  arbitrumgoerli: {
    threshold: 2,
    validators: [
      '0x071c8d135845ae5a2cb73f98d681d519014c0a8b',
      '0x1bcf03360989f15cbeb174c188288f2c6d2760d7',
      '0xc1590eaaeaf380e7859564c5ebcdcc87e8369e0d',
    ],
  },

  avalanche: {
    threshold: 2,
    validators: [
      '0x3fb8263859843bffb02950c492d492cae169f4cf',
      '0x402e0f8c6e4210d408b6ac00d197d4a099fcd25a', // dsrv
      '0x716a1d4d3166c6151b05ce0450e0d77d94588eac', // everstake
    ],
  },

  base: {
    threshold: 2,
    validators: [
      '0xb9453d675e0fa3c178a17b4ce1ad5b1a279b3af9',
      '0x4512985a574cb127b2af2d4bb676876ce804e3f8',
      '0x41188cb5a5493a961c467ba38a3f8b1f1d35ee63', // everstake
    ],
  },

  basegoerli: {
    threshold: 2,
    validators: [
      '0xf6eddda696dcd3bf10f7ce8a02db31ef2e775a03',
      '0x5a7d05cebf5db4dde9b2fedcefa76fb58fa05071',
      '0x9260a6c7d54cbcbed28f8668679cd1fa3a203b25',
    ],
  },

  bsc: {
    threshold: 2,
    validators: [
      '0x570af9b7b36568c8877eebba6c6727aa9dab7268',
      '0x8292b1a53907ece0f76af8a50724e9492bcdc8a3', // dsrv
      '0xeaf5cf9100f36a4baeea779f8745dda86159103c', // everstake
    ],
  },

  bsctestnet: {
    threshold: 2,
    validators: [
      '0x242d8a855a8c932dec51f7999ae7d1e48b10c95e',
      '0xf620f5e3d25a3ae848fec74bccae5de3edcd8796',
      '0x1f030345963c54ff8229720dd3a711c15c554aeb',
    ],
  },

  celo: {
    threshold: 2,
    validators: [
      '0x63478422679303c3e4fc611b771fa4a707ef7f4a',
      '0x622e43baf06ad808ca8399360d9a2d9a1a12688b', // dsrv
      '0xf2c1e3888eb618f1f1a071ef3618f134715a9a49', // everstake
      '0x46ecbc794574727abb8f97f01dacd9db6135f47a', // staked
    ],
  },

  chiado: {
    threshold: 2,
    validators: [
      '0x06c3757a4b7a912828e523bb8a5f980ddc297356',
      '0x0874967a145d70b799ebe9ed861ab7c93faef95a',
      '0xd767ea1206b8295d7e1267ddd00e56d34f278db6',
    ],
  },

  ethereum: {
    threshold: 3,
    validators: [
      '0x03c842db86a6a3e524d4a6615390c1ea8e2b9541',
      '0x94438a7de38d4548ae54df5c6010c4ebc5239eae', // dsrv
      '0x5450447aee7b544c462c9352bef7cad049b0c2dc', // zeeprime
      '0xce327111035dd38698c92c3778884dbbb0ca8103', // everstake
      // '0xb2f5a6a6e6046e2ede213617e989329666a6c4bc', // staked (not yet announced)
    ],
  },

  fuji: {
    threshold: 2,
    validators: [
      '0xd8154f73d04cc7f7f0c332793692e6e6f6b2402e',
      '0x895ae30bc83ff1493b9cf7781b0b813d23659857',
      '0x43e915573d9f1383cbf482049e4a012290759e7f',
    ],
  },

  gnosis: {
    threshold: 2,
    validators: [
      '0xd4df66a859585678f2ea8357161d896be19cc1ca',
      '0x19fb7e04a1be6b39b6966a0b0c60b929a93ed672', // dsrv
      '0xdb96116d13a2fadde9742d7cc88474a5ed39a03a', // everstake
    ],
  },

  goerli: {
    threshold: 2,
    validators: [
      '0x05a9b5efe9f61f9142453d8e9f61565f333c6768',
      '0x43a96c7dfbd8187c95013d6ee8665650cbdb2673',
      '0x7940a12c050e24e1839c21ecb12f65afd84e8c5b',
    ],
  },

  lineagoerli: {
    threshold: 2,
    validators: [
      '0xd767ea1206b8295d7e1267ddd00e56d34f278db6',
      '0x4a5d7085ca93c22fbc994dd97857c98fcc745674',
      '0x8327779c3c31fa1ffc7f0c9ffae33e4d804bbd8f',
    ],
  },

  mantapacific: {
    threshold: 5,
    validators: [
      '0x8e668c97ad76d0e28375275c41ece4972ab8a5bc', //abacusworks
      '0x521a3e6bf8d24809fde1c1fd3494a859a16f132c', //cosmostation
      '0x14025fe092f5f8a401dd9819704d9072196d2125', //p2p
      '0x25b9a0961c51e74fd83295293bc029131bf1e05a', //neutron
      '0xa0eE95e280D46C14921e524B075d0C341e7ad1C8', //cosmos spaces
      '0xcc9a0b6de7fe314bd99223687d784730a75bb957', //dsrv
      '0x42b6de2edbaa62c2ea2309ad85d20b3e37d38acf', //sg-1
    ],
  },

  moonbasealpha: {
    threshold: 2,
    validators: [
      '0x521877064bd7ac7500d300f162c8c47c256a2f9c',
      '0xbc1c70f58ae0459d4b8a013245420a893837d568',
      '0x01e42c2c44af81dda1ac16fec76fea2a7a54a44c',
    ],
  },

  moonbeam: {
    threshold: 2,
    validators: [
      '0x2225e2f4e9221049456da93b71d2de41f3b6b2a8',
      '0x645428d198d2e76cbd9c1647f5c80740bb750b97', // dsrv
      '0xaed886392df07897743d8e272d438f00c4c9a2ae', // everstake
      '0xcf0bb43255849cb3709a96ee166e5c3ce4adc7f9', // staked
    ],
  },

  mumbai: {
    threshold: 2,
    validators: [
      '0xebc301013b6cd2548e347c28d2dc43ec20c068f2',
      '0x315db9868fc8813b221b1694f8760ece39f45447',
      '0x17517c98358c5937c5d9ee47ce1f5b4c2b7fc9f5',
    ],
  },

  neutron: {
    threshold: 2,
    validators: [
      '0xa9b8c1f4998f781f958c63cfcd1708d02f004ff0',
      '0x60e890b34cb44ce3fa52f38684f613f31b47a1a6',
      '0x7885fae56dbcf5176657f54adbbd881dc6714132',
    ],
  },

  optimism: {
    threshold: 2,
    validators: [
      '0x20349eadc6c72e94ce38268b96692b1a5c20de4f',
      '0x5b7d47b76c69740462432f6a5a0ca5005e014157', // dsrv
      '0x22b1ad4322cdb5f2c76ebf4e5a93803d480fcf0d', // everstake
      '0x9636fbe90b6816438327b0fbde435aa3c8eeda15', // staked
    ],
  },

  optimismgoerli: {
    threshold: 2,
    validators: [
      '0x79e58546e2faca865c6732ad5f6c4951051c4d67',
      '0x7bbfe1bb7146aad7df309c637987d856179ebbc1',
      '0xf3d2fb4d53c2bb6a88cec040e0d87430fcee4e40',
    ],
  },

  polygon: {
    threshold: 2,
    validators: [
      '0x12ecb319c7f4e8ac5eb5226662aeb8528c5cefac',
      '0x008f24cbb1cc30ad0f19f2516ca75730e37efb5f', // dsrv
      '0x722aa4d45387009684582bca8281440d16b8b40f', // everstake
    ],
  },

  polygonzkevm: {
    threshold: 2,
    validators: [
      '0x86f2a44592bb98da766e880cfd70d3bbb295e61a',
      '0xc84076030bdabaabb9e61161d833dd84b700afda',
      '0x57231619fea13d85270ca6943298046c75a6dd01', // everstake
    ],
  },

  polygonzkevmtestnet: {
    threshold: 2,
    validators: [
      '0x3f06b725bc9648917eb11c414e9f8d76fd959550',
      '0x27bfc57679d9dd4ab2e870f5ed7ec0b339a0b636',
      '0xd476548222f43206d0abaa30e46e28670aa7859c',
    ],
  },

  scroll: {
    threshold: 2,
    validators: [
      '0xad557170a9f2f21c35e03de07cb30dcbcc3dff63',
      '0xb37fe43a9f47b7024c2d5ae22526cc66b5261533',
      '0x276de8e2b88e659c4e5ad30d62d9de42c3da3403', // everstake
    ],
  },

  scrollsepolia: {
    threshold: 2,
    validators: [
      '0xbe18dbd758afb367180260b524e6d4bcd1cb6d05',
      '0x9a11ed23ae962974018ab45bc133caabff7b3271',
      '0x7867bea3c9761fe64e6d124b171f91fd5dd79644',
    ],
  },

  sepolia: {
    threshold: 2,
    validators: [
      '0xb22b65f202558adf86a8bb2847b76ae1036686a5',
      '0x469f0940684d147defc44f3647146cb90dd0bc8e',
      '0xd3c75dcf15056012a4d74c483a0c6ea11d8c2b83',
    ],
  },

  solanadevnet: {
    threshold: 2,
    validators: [
      '0xec0f73dbc5b1962a20f7dcbe07c98414025b0c43',
      '0x9c20a149dfa09ea9f77f5a7ca09ed44f9c025133',
      '0x967c5ecdf2625ae86580bd203b630abaaf85cd62',
    ],
  },
};
