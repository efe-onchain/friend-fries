# Friend Fries🍟

## Overview

The project allows participants of ETHGlobal Brussels hackathon to use their NFC tags to create and complete custom bounties. These bounties can range from helping other hackers with bugs to finding easter eggs hidden within the venue. The possibilities for bounties that our platform can handle are not limited.

## User Sign-Up and NFC Registration

Users can sign up using Dynamic.xyz's social login and register their NFC tag to their account. The NFC tags are associated with an Embedded Wallet where users create and claim bounties. After registering the NFC tag, users can view the available bounties to complete and claim. Upon completing a bounty, the user physically finds the person who started the bounty. The owner of the bounty uses our platform to scan the NFC tag of the participant, and the designated funds are immediately sent to the participant's wallet.

## Creating Custom Bounties

Users can also create their custom bounties. After signing in, users fill out a short form through our UI and pledge the amount of ETH they desire. Their bounty will be visible on our dashboard for other users to complete.

## Leaderboard

As users complete and grab more bounties, they see their position on the leaderboard. The leaderboard is what gives the name of our platform. The top position on the leaderboard is to win Belgian 🍟!

## Technology Stack

### User Management and Wallet Integration

Friend Fries🍟 uses [Dynamic.xyz](https://www.dynamic.xyz/) to manage user log-ins and create an embedded wallet linked to the users' email addresses. It uses these generated wallets to submit transactions to create and complete the bounties. This simplifies the flow by not requiring an interaction from a third-party wallet integration and protects the privacy of the users by creating a new clean wallet that can be used in their outdoor bounty activities.

### NFC Tag Integration

The project uses the [Arx chips](https://arx.org/) from the ETHGlobal bracelets as a source of identity that incentivizes physical interactions and explorations for the bounties. The link between the identity from the chip and the embedded wallets of the users was done using a PostgreSQL database hosted on Vercel.

### Data Indexing

Friend Fries uses [The Graph](https://thegraph.com/) to index all necessary information about the contracts, which is displayed on the UI bounties, leaderboard, and profile pages. The speed and ease of use of The Graph helped the development of the project. 

The subgraph is deployed on the decentralized network and available for use at:
[https://gateway-arbitrum.network.thegraph.com/api/[api-key]/subgraphs/id/AQL2hBo9CeiaCNP2Ks3iJHVo1iXiBgAVJBXJwnta9Xny](https://gateway-arbitrum.network.thegraph.com/api/[api-key]/subgraphs/id/AQL2hBo9CeiaCNP2Ks3iJHVo1iXiBgAVJBXJwnta9Xny)

We attempted to optimize the subgraph as much as we could. We used Bytes as IDs and created lookup tables for many-to-many relationships. We used `@derivedFrom` and immutable for improved indexing. To have cleaner code, we used graph-client to query in our front end.

### Contract Deployment

We deployed our contracts on Base Sepolia.
