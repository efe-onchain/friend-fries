// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace FriendfriesTypes {
  export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigDecimal: { input: any; output: any; }
  BigInt: { input: any; output: any; }
  Bytes: { input: any; output: any; }
  Int8: { input: any; output: any; }
  Timestamp: { input: any; output: any; }
};

export type Aggregation_interval =
  | 'hour'
  | 'day';

export type BlockChangedFilter = {
  number_gte: Scalars['Int']['input'];
};

export type Block_height = {
  hash?: InputMaybe<Scalars['Bytes']['input']>;
  number?: InputMaybe<Scalars['Int']['input']>;
  number_gte?: InputMaybe<Scalars['Int']['input']>;
};

export type Bounty = {
  id: Scalars['Bytes']['output'];
  bountyNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  title: Scalars['String']['output'];
  description: Scalars['String']['output'];
  image: Scalars['String']['output'];
  individualReward: Scalars['BigInt']['output'];
  deadline: Scalars['BigInt']['output'];
  maxParticipants: Scalars['BigInt']['output'];
  numParticipants: Scalars['BigInt']['output'];
  rewarded: Scalars['BigInt']['output'];
  status: Scalars['Int8']['output'];
  owner: Scalars['Bytes']['output'];
  participants: Array<BountyParticipant>;
};


export type BountyparticipantsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<BountyParticipant_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<BountyParticipant_filter>;
};

export type BountyParticipant = {
  id: Scalars['Bytes']['output'];
  bounty: Bounty;
  participant: Participant;
  rewarded: Scalars['BigInt']['output'];
};

export type BountyParticipant_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  bounty?: InputMaybe<Scalars['String']['input']>;
  bounty_not?: InputMaybe<Scalars['String']['input']>;
  bounty_gt?: InputMaybe<Scalars['String']['input']>;
  bounty_lt?: InputMaybe<Scalars['String']['input']>;
  bounty_gte?: InputMaybe<Scalars['String']['input']>;
  bounty_lte?: InputMaybe<Scalars['String']['input']>;
  bounty_in?: InputMaybe<Array<Scalars['String']['input']>>;
  bounty_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  bounty_contains?: InputMaybe<Scalars['String']['input']>;
  bounty_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  bounty_not_contains?: InputMaybe<Scalars['String']['input']>;
  bounty_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  bounty_starts_with?: InputMaybe<Scalars['String']['input']>;
  bounty_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  bounty_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  bounty_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  bounty_ends_with?: InputMaybe<Scalars['String']['input']>;
  bounty_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  bounty_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  bounty_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  bounty_?: InputMaybe<Bounty_filter>;
  participant?: InputMaybe<Scalars['String']['input']>;
  participant_not?: InputMaybe<Scalars['String']['input']>;
  participant_gt?: InputMaybe<Scalars['String']['input']>;
  participant_lt?: InputMaybe<Scalars['String']['input']>;
  participant_gte?: InputMaybe<Scalars['String']['input']>;
  participant_lte?: InputMaybe<Scalars['String']['input']>;
  participant_in?: InputMaybe<Array<Scalars['String']['input']>>;
  participant_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  participant_contains?: InputMaybe<Scalars['String']['input']>;
  participant_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  participant_not_contains?: InputMaybe<Scalars['String']['input']>;
  participant_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  participant_starts_with?: InputMaybe<Scalars['String']['input']>;
  participant_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  participant_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  participant_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  participant_ends_with?: InputMaybe<Scalars['String']['input']>;
  participant_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  participant_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  participant_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  participant_?: InputMaybe<Participant_filter>;
  rewarded?: InputMaybe<Scalars['BigInt']['input']>;
  rewarded_not?: InputMaybe<Scalars['BigInt']['input']>;
  rewarded_gt?: InputMaybe<Scalars['BigInt']['input']>;
  rewarded_lt?: InputMaybe<Scalars['BigInt']['input']>;
  rewarded_gte?: InputMaybe<Scalars['BigInt']['input']>;
  rewarded_lte?: InputMaybe<Scalars['BigInt']['input']>;
  rewarded_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  rewarded_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<BountyParticipant_filter>>>;
  or?: InputMaybe<Array<InputMaybe<BountyParticipant_filter>>>;
};

export type BountyParticipant_orderBy =
  | 'id'
  | 'bounty'
  | 'bounty__id'
  | 'bounty__bountyNumber'
  | 'bounty__blockTimestamp'
  | 'bounty__title'
  | 'bounty__description'
  | 'bounty__image'
  | 'bounty__individualReward'
  | 'bounty__deadline'
  | 'bounty__maxParticipants'
  | 'bounty__numParticipants'
  | 'bounty__rewarded'
  | 'bounty__status'
  | 'bounty__owner'
  | 'participant'
  | 'participant__id'
  | 'participant__totalRewards'
  | 'rewarded';

export type Bounty_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  bountyNumber?: InputMaybe<Scalars['BigInt']['input']>;
  bountyNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  bountyNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  bountyNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  bountyNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  bountyNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  bountyNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  bountyNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_not?: InputMaybe<Scalars['String']['input']>;
  title_gt?: InputMaybe<Scalars['String']['input']>;
  title_lt?: InputMaybe<Scalars['String']['input']>;
  title_gte?: InputMaybe<Scalars['String']['input']>;
  title_lte?: InputMaybe<Scalars['String']['input']>;
  title_in?: InputMaybe<Array<Scalars['String']['input']>>;
  title_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  title_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  title_starts_with?: InputMaybe<Scalars['String']['input']>;
  title_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  title_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  title_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  title_ends_with?: InputMaybe<Scalars['String']['input']>;
  title_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  title_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  title_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  description_not?: InputMaybe<Scalars['String']['input']>;
  description_gt?: InputMaybe<Scalars['String']['input']>;
  description_lt?: InputMaybe<Scalars['String']['input']>;
  description_gte?: InputMaybe<Scalars['String']['input']>;
  description_lte?: InputMaybe<Scalars['String']['input']>;
  description_in?: InputMaybe<Array<Scalars['String']['input']>>;
  description_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  description_contains?: InputMaybe<Scalars['String']['input']>;
  description_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  description_not_contains?: InputMaybe<Scalars['String']['input']>;
  description_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  description_starts_with?: InputMaybe<Scalars['String']['input']>;
  description_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  description_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  description_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  description_ends_with?: InputMaybe<Scalars['String']['input']>;
  description_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  description_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  description_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  image_not?: InputMaybe<Scalars['String']['input']>;
  image_gt?: InputMaybe<Scalars['String']['input']>;
  image_lt?: InputMaybe<Scalars['String']['input']>;
  image_gte?: InputMaybe<Scalars['String']['input']>;
  image_lte?: InputMaybe<Scalars['String']['input']>;
  image_in?: InputMaybe<Array<Scalars['String']['input']>>;
  image_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  image_contains?: InputMaybe<Scalars['String']['input']>;
  image_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  image_not_contains?: InputMaybe<Scalars['String']['input']>;
  image_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  image_starts_with?: InputMaybe<Scalars['String']['input']>;
  image_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  image_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  image_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  image_ends_with?: InputMaybe<Scalars['String']['input']>;
  image_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  image_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  image_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  individualReward?: InputMaybe<Scalars['BigInt']['input']>;
  individualReward_not?: InputMaybe<Scalars['BigInt']['input']>;
  individualReward_gt?: InputMaybe<Scalars['BigInt']['input']>;
  individualReward_lt?: InputMaybe<Scalars['BigInt']['input']>;
  individualReward_gte?: InputMaybe<Scalars['BigInt']['input']>;
  individualReward_lte?: InputMaybe<Scalars['BigInt']['input']>;
  individualReward_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  individualReward_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  deadline?: InputMaybe<Scalars['BigInt']['input']>;
  deadline_not?: InputMaybe<Scalars['BigInt']['input']>;
  deadline_gt?: InputMaybe<Scalars['BigInt']['input']>;
  deadline_lt?: InputMaybe<Scalars['BigInt']['input']>;
  deadline_gte?: InputMaybe<Scalars['BigInt']['input']>;
  deadline_lte?: InputMaybe<Scalars['BigInt']['input']>;
  deadline_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  deadline_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  maxParticipants?: InputMaybe<Scalars['BigInt']['input']>;
  maxParticipants_not?: InputMaybe<Scalars['BigInt']['input']>;
  maxParticipants_gt?: InputMaybe<Scalars['BigInt']['input']>;
  maxParticipants_lt?: InputMaybe<Scalars['BigInt']['input']>;
  maxParticipants_gte?: InputMaybe<Scalars['BigInt']['input']>;
  maxParticipants_lte?: InputMaybe<Scalars['BigInt']['input']>;
  maxParticipants_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  maxParticipants_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  numParticipants?: InputMaybe<Scalars['BigInt']['input']>;
  numParticipants_not?: InputMaybe<Scalars['BigInt']['input']>;
  numParticipants_gt?: InputMaybe<Scalars['BigInt']['input']>;
  numParticipants_lt?: InputMaybe<Scalars['BigInt']['input']>;
  numParticipants_gte?: InputMaybe<Scalars['BigInt']['input']>;
  numParticipants_lte?: InputMaybe<Scalars['BigInt']['input']>;
  numParticipants_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  numParticipants_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  rewarded?: InputMaybe<Scalars['BigInt']['input']>;
  rewarded_not?: InputMaybe<Scalars['BigInt']['input']>;
  rewarded_gt?: InputMaybe<Scalars['BigInt']['input']>;
  rewarded_lt?: InputMaybe<Scalars['BigInt']['input']>;
  rewarded_gte?: InputMaybe<Scalars['BigInt']['input']>;
  rewarded_lte?: InputMaybe<Scalars['BigInt']['input']>;
  rewarded_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  rewarded_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  status?: InputMaybe<Scalars['Int8']['input']>;
  status_not?: InputMaybe<Scalars['Int8']['input']>;
  status_gt?: InputMaybe<Scalars['Int8']['input']>;
  status_lt?: InputMaybe<Scalars['Int8']['input']>;
  status_gte?: InputMaybe<Scalars['Int8']['input']>;
  status_lte?: InputMaybe<Scalars['Int8']['input']>;
  status_in?: InputMaybe<Array<Scalars['Int8']['input']>>;
  status_not_in?: InputMaybe<Array<Scalars['Int8']['input']>>;
  owner?: InputMaybe<Scalars['Bytes']['input']>;
  owner_not?: InputMaybe<Scalars['Bytes']['input']>;
  owner_gt?: InputMaybe<Scalars['Bytes']['input']>;
  owner_lt?: InputMaybe<Scalars['Bytes']['input']>;
  owner_gte?: InputMaybe<Scalars['Bytes']['input']>;
  owner_lte?: InputMaybe<Scalars['Bytes']['input']>;
  owner_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  owner_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  owner_contains?: InputMaybe<Scalars['Bytes']['input']>;
  owner_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  participants_?: InputMaybe<BountyParticipant_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Bounty_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Bounty_filter>>>;
};

export type Bounty_orderBy =
  | 'id'
  | 'bountyNumber'
  | 'blockTimestamp'
  | 'title'
  | 'description'
  | 'image'
  | 'individualReward'
  | 'deadline'
  | 'maxParticipants'
  | 'numParticipants'
  | 'rewarded'
  | 'status'
  | 'owner'
  | 'participants';

/** Defines the order direction, either ascending or descending */
export type OrderDirection =
  | 'asc'
  | 'desc';

export type Participant = {
  id: Scalars['Bytes']['output'];
  participated: Array<BountyParticipant>;
  totalRewards: Scalars['BigInt']['output'];
};


export type ParticipantparticipatedArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<BountyParticipant_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<BountyParticipant_filter>;
};

export type Participant_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  participated_?: InputMaybe<BountyParticipant_filter>;
  totalRewards?: InputMaybe<Scalars['BigInt']['input']>;
  totalRewards_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalRewards_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalRewards_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalRewards_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalRewards_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalRewards_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalRewards_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Participant_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Participant_filter>>>;
};

export type Participant_orderBy =
  | 'id'
  | 'participated'
  | 'totalRewards';

export type Query = {
  bounty?: Maybe<Bounty>;
  bounties: Array<Bounty>;
  participant?: Maybe<Participant>;
  participants: Array<Participant>;
  bountyParticipant?: Maybe<BountyParticipant>;
  bountyParticipants: Array<BountyParticipant>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type QuerybountyArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerybountiesArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Bounty_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Bounty_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryparticipantArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryparticipantsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Participant_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Participant_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerybountyParticipantArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerybountyParticipantsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<BountyParticipant_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<BountyParticipant_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Query_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type Subscription = {
  bounty?: Maybe<Bounty>;
  bounties: Array<Bounty>;
  participant?: Maybe<Participant>;
  participants: Array<Participant>;
  bountyParticipant?: Maybe<BountyParticipant>;
  bountyParticipants: Array<BountyParticipant>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type SubscriptionbountyArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionbountiesArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Bounty_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Bounty_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionparticipantArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionparticipantsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Participant_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Participant_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionbountyParticipantArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionbountyParticipantsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<BountyParticipant_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<BountyParticipant_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscription_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type _Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']['output']>;
  /** The block number */
  number: Scalars['Int']['output'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']['output']>;
  /** The hash of the parent block */
  parentHash?: Maybe<Scalars['Bytes']['output']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String']['output'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean']['output'];
};

export type _SubgraphErrorPolicy_ =
  /** Data will be returned even if the subgraph has indexing errors */
  | 'allow'
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  | 'deny';

  export type QuerySdk = {
      /** null **/
  bounty: InContextSdkMethod<Query['bounty'], QuerybountyArgs, MeshContext>,
  /** null **/
  bounties: InContextSdkMethod<Query['bounties'], QuerybountiesArgs, MeshContext>,
  /** null **/
  participant: InContextSdkMethod<Query['participant'], QueryparticipantArgs, MeshContext>,
  /** null **/
  participants: InContextSdkMethod<Query['participants'], QueryparticipantsArgs, MeshContext>,
  /** null **/
  bountyParticipant: InContextSdkMethod<Query['bountyParticipant'], QuerybountyParticipantArgs, MeshContext>,
  /** null **/
  bountyParticipants: InContextSdkMethod<Query['bountyParticipants'], QuerybountyParticipantsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Query['_meta'], Query_metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  bounty: InContextSdkMethod<Subscription['bounty'], SubscriptionbountyArgs, MeshContext>,
  /** null **/
  bounties: InContextSdkMethod<Subscription['bounties'], SubscriptionbountiesArgs, MeshContext>,
  /** null **/
  participant: InContextSdkMethod<Subscription['participant'], SubscriptionparticipantArgs, MeshContext>,
  /** null **/
  participants: InContextSdkMethod<Subscription['participants'], SubscriptionparticipantsArgs, MeshContext>,
  /** null **/
  bountyParticipant: InContextSdkMethod<Subscription['bountyParticipant'], SubscriptionbountyParticipantArgs, MeshContext>,
  /** null **/
  bountyParticipants: InContextSdkMethod<Subscription['bountyParticipants'], SubscriptionbountyParticipantsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Subscription['_meta'], Subscription_metaArgs, MeshContext>
  };

  export type Context = {
      ["friendfries"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
