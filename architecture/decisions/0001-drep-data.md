# 1. dRep Data Storage

Date: 2022-07-18

## Status

Accepted

## Context

We need to be able to store
- dRep profile data

## Decision

We will use a postgreSQL database in the backend to store this data.

## Consequences

We will store dRep profile data in a backend postgreSQL database, the frontend will be able to perform CRUD operations on this data.