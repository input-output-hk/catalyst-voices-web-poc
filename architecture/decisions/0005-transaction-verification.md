# 5. Use Blockfrost for transaction verification

Date: 2022-08-25

## Status

Accepted

## Context

We need to be able to confirm that registration/delegation transactions successfully made it to mainnet in the GVC Frontend, so that the correct UI can be shown to users.

## Decision

We will use Blockfrost for this and a timed Cron job to index the transactions stored in the backend database. If a transaction is over X hours old and cannot be seen on mainnet via Blockfrost then it is assumed it will not make it.

In the time in between submission and confirmation users should be treated as if their transaction was successful.

## Consequences

The status of transactions stored in the backend database will be regularly checked if they made it onto mainnet via Blockfrost.
