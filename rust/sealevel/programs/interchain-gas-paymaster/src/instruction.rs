use borsh::{BorshDeserialize, BorshSerialize};
use hyperlane_core::H256;

use solana_program::pubkey::Pubkey;

use crate::accounts::GasOracle;

#[derive(BorshDeserialize, BorshSerialize, Debug, PartialEq)]
pub enum Instruction {
    Init,
    InitIgp(InitIgp),
    InitOverheadIgp(InitOverheadIgp),
    PayForGas(PayForGas),
    QuoteGasPayment(QuoteGasPayment),
    TransferIgpOwnership(Option<Pubkey>),
    TransferOverheadIgpOwnership(Option<Pubkey>),
    SetIgpBeneficiary(Pubkey),
    SetDestinationGasOverheads(Vec<GasOverheadConfig>),
    SetGasOracleConfigs(Vec<GasOracleConfig>),
    Claim,
}

#[derive(BorshDeserialize, BorshSerialize, Debug, PartialEq)]
pub struct InitIgp {
    pub salt: H256,
    pub owner: Option<Pubkey>,
    pub beneficiary: Pubkey,
}

#[derive(BorshDeserialize, BorshSerialize, Debug, PartialEq)]
pub struct InitOverheadIgp {
    pub salt: H256,
    pub owner: Option<Pubkey>,
    pub inner: Pubkey,
}

#[derive(BorshDeserialize, BorshSerialize, Debug, PartialEq)]
pub struct PayForGas {
    pub message_id: H256,
    pub destination_domain: u32,
    pub gas_amount: u64,
}

#[derive(BorshDeserialize, BorshSerialize, Debug, PartialEq)]
pub struct QuoteGasPayment {
    pub destination_domain: u32,
    pub gas_amount: u64,
}

#[derive(BorshDeserialize, BorshSerialize, Debug, PartialEq, Clone)]
pub struct GasOverheadConfig {
    pub destination_domain: u32,
    pub gas_overhead: Option<u64>,
}

/// A config for setting remote gas data.
#[derive(BorshDeserialize, BorshSerialize, Debug, PartialEq, Clone)]
pub struct GasOracleConfig {
    pub domain: u32,
    pub gas_oracle: Option<GasOracle>,
}
