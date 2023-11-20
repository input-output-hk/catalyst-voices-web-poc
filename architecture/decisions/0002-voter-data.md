# 2. Voter Data Storage

Date: 2022-07-18

## Status

Accepted

## Context

GVC Frontend needs to be able identify the voter group a connecting wallet is in, so it is able to serve the correct UI.

## Decision

For MVP we will cache voter information gathered via GVC in the backend PostgreSQL database.

## Consequences

We will store voter/transaction information in the backend database so Frontend can always query. This solution means that GVC is blind to registrations/delegations that take place via other tools.