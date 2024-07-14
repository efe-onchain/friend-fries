// @ts-nocheck
import { GraphQLResolveInfo, SelectionSetNode, FieldNode, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { gql } from '@graphql-mesh/utils';

import type { GetMeshOptions } from '@graphql-mesh/runtime';
import type { YamlConfig } from '@graphql-mesh/types';
import { PubSub } from '@graphql-mesh/utils';
import { DefaultLogger } from '@graphql-mesh/utils';
import MeshCache from "@graphql-mesh/cache-localforage";
import { fetch as fetchFn } from '@whatwg-node/fetch';

import { MeshResolvedSource } from '@graphql-mesh/runtime';
import { MeshTransform, MeshPlugin } from '@graphql-mesh/types';
import GraphqlHandler from "@graphql-mesh/graphql"
import BareMerger from "@graphql-mesh/merger-bare";
import { printWithCache } from '@graphql-mesh/utils';
import { usePersistedOperations } from '@graphql-yoga/plugin-persisted-operations';
import { createMeshHTTPHandler, MeshHTTPHandler } from '@graphql-mesh/http';
import { getMesh, ExecuteMeshFn, SubscribeMeshFn, MeshContext as BaseMeshContext, MeshInstance } from '@graphql-mesh/runtime';
import { MeshStore, FsStoreStorageAdapter } from '@graphql-mesh/store';
import { path as pathModule } from '@graphql-mesh/cross-helpers';
import { ImportFn } from '@graphql-mesh/types';
import type { FriendfriesTypes } from './sources/friendfries/types';
import * as importedModule$0 from "./sources/friendfries/introspectionSchema";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };



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

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string | ((fieldNode: FieldNode) => SelectionSetNode);
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Aggregation_interval: Aggregation_interval;
  BigDecimal: ResolverTypeWrapper<Scalars['BigDecimal']['output']>;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']['output']>;
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Bounty: ResolverTypeWrapper<Bounty>;
  BountyParticipant: ResolverTypeWrapper<BountyParticipant>;
  BountyParticipant_filter: BountyParticipant_filter;
  BountyParticipant_orderBy: BountyParticipant_orderBy;
  Bounty_filter: Bounty_filter;
  Bounty_orderBy: Bounty_orderBy;
  Bytes: ResolverTypeWrapper<Scalars['Bytes']['output']>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Int8: ResolverTypeWrapper<Scalars['Int8']['output']>;
  OrderDirection: OrderDirection;
  Participant: ResolverTypeWrapper<Participant>;
  Participant_filter: Participant_filter;
  Participant_orderBy: Participant_orderBy;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Subscription: ResolverTypeWrapper<{}>;
  Timestamp: ResolverTypeWrapper<Scalars['Timestamp']['output']>;
  _Block_: ResolverTypeWrapper<_Block_>;
  _Meta_: ResolverTypeWrapper<_Meta_>;
  _SubgraphErrorPolicy_: _SubgraphErrorPolicy_;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  BigDecimal: Scalars['BigDecimal']['output'];
  BigInt: Scalars['BigInt']['output'];
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: Scalars['Boolean']['output'];
  Bounty: Bounty;
  BountyParticipant: BountyParticipant;
  BountyParticipant_filter: BountyParticipant_filter;
  Bounty_filter: Bounty_filter;
  Bytes: Scalars['Bytes']['output'];
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Int8: Scalars['Int8']['output'];
  Participant: Participant;
  Participant_filter: Participant_filter;
  Query: {};
  String: Scalars['String']['output'];
  Subscription: {};
  Timestamp: Scalars['Timestamp']['output'];
  _Block_: _Block_;
  _Meta_: _Meta_;
}>;

export type entityDirectiveArgs = { };

export type entityDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = entityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type subgraphIdDirectiveArgs = {
  id: Scalars['String']['input'];
};

export type subgraphIdDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = subgraphIdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type derivedFromDirectiveArgs = {
  field: Scalars['String']['input'];
};

export type derivedFromDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = derivedFromDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export interface BigDecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigDecimal'], any> {
  name: 'BigDecimal';
}

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export type BountyResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Bounty'] = ResolversParentTypes['Bounty']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  bountyNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  image?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  individualReward?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  deadline?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  maxParticipants?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  numParticipants?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  rewarded?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Int8'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  participants?: Resolver<Array<ResolversTypes['BountyParticipant']>, ParentType, ContextType, RequireFields<BountyparticipantsArgs, 'skip' | 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BountyParticipantResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['BountyParticipant'] = ResolversParentTypes['BountyParticipant']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  bounty?: Resolver<ResolversTypes['Bounty'], ParentType, ContextType>;
  participant?: Resolver<ResolversTypes['Participant'], ParentType, ContextType>;
  rewarded?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface BytesScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Bytes'], any> {
  name: 'Bytes';
}

export interface Int8ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Int8'], any> {
  name: 'Int8';
}

export type ParticipantResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Participant'] = ResolversParentTypes['Participant']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  participated?: Resolver<Array<ResolversTypes['BountyParticipant']>, ParentType, ContextType, RequireFields<ParticipantparticipatedArgs, 'skip' | 'first'>>;
  totalRewards?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  bounty?: Resolver<Maybe<ResolversTypes['Bounty']>, ParentType, ContextType, RequireFields<QuerybountyArgs, 'id' | 'subgraphError'>>;
  bounties?: Resolver<Array<ResolversTypes['Bounty']>, ParentType, ContextType, RequireFields<QuerybountiesArgs, 'skip' | 'first' | 'subgraphError'>>;
  participant?: Resolver<Maybe<ResolversTypes['Participant']>, ParentType, ContextType, RequireFields<QueryparticipantArgs, 'id' | 'subgraphError'>>;
  participants?: Resolver<Array<ResolversTypes['Participant']>, ParentType, ContextType, RequireFields<QueryparticipantsArgs, 'skip' | 'first' | 'subgraphError'>>;
  bountyParticipant?: Resolver<Maybe<ResolversTypes['BountyParticipant']>, ParentType, ContextType, RequireFields<QuerybountyParticipantArgs, 'id' | 'subgraphError'>>;
  bountyParticipants?: Resolver<Array<ResolversTypes['BountyParticipant']>, ParentType, ContextType, RequireFields<QuerybountyParticipantsArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: Resolver<Maybe<ResolversTypes['_Meta_']>, ParentType, ContextType, Partial<Query_metaArgs>>;
}>;

export type SubscriptionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  bounty?: SubscriptionResolver<Maybe<ResolversTypes['Bounty']>, "bounty", ParentType, ContextType, RequireFields<SubscriptionbountyArgs, 'id' | 'subgraphError'>>;
  bounties?: SubscriptionResolver<Array<ResolversTypes['Bounty']>, "bounties", ParentType, ContextType, RequireFields<SubscriptionbountiesArgs, 'skip' | 'first' | 'subgraphError'>>;
  participant?: SubscriptionResolver<Maybe<ResolversTypes['Participant']>, "participant", ParentType, ContextType, RequireFields<SubscriptionparticipantArgs, 'id' | 'subgraphError'>>;
  participants?: SubscriptionResolver<Array<ResolversTypes['Participant']>, "participants", ParentType, ContextType, RequireFields<SubscriptionparticipantsArgs, 'skip' | 'first' | 'subgraphError'>>;
  bountyParticipant?: SubscriptionResolver<Maybe<ResolversTypes['BountyParticipant']>, "bountyParticipant", ParentType, ContextType, RequireFields<SubscriptionbountyParticipantArgs, 'id' | 'subgraphError'>>;
  bountyParticipants?: SubscriptionResolver<Array<ResolversTypes['BountyParticipant']>, "bountyParticipants", ParentType, ContextType, RequireFields<SubscriptionbountyParticipantsArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: SubscriptionResolver<Maybe<ResolversTypes['_Meta_']>, "_meta", ParentType, ContextType, Partial<Subscription_metaArgs>>;
}>;

export interface TimestampScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Timestamp'], any> {
  name: 'Timestamp';
}

export type _Block_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Block_'] = ResolversParentTypes['_Block_']> = ResolversObject<{
  hash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  parentHash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Meta_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Meta_'] = ResolversParentTypes['_Meta_']> = ResolversObject<{
  block?: Resolver<ResolversTypes['_Block_'], ParentType, ContextType>;
  deployment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasIndexingErrors?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = MeshContext> = ResolversObject<{
  BigDecimal?: GraphQLScalarType;
  BigInt?: GraphQLScalarType;
  Bounty?: BountyResolvers<ContextType>;
  BountyParticipant?: BountyParticipantResolvers<ContextType>;
  Bytes?: GraphQLScalarType;
  Int8?: GraphQLScalarType;
  Participant?: ParticipantResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Timestamp?: GraphQLScalarType;
  _Block_?: _Block_Resolvers<ContextType>;
  _Meta_?: _Meta_Resolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = MeshContext> = ResolversObject<{
  entity?: entityDirectiveResolver<any, any, ContextType>;
  subgraphId?: subgraphIdDirectiveResolver<any, any, ContextType>;
  derivedFrom?: derivedFromDirectiveResolver<any, any, ContextType>;
}>;

export type MeshContext = FriendfriesTypes.Context & BaseMeshContext;


import { fileURLToPath } from '@graphql-mesh/utils';
const baseDir = pathModule.join(pathModule.dirname(fileURLToPath(import.meta.url)), '..');

const importFn: ImportFn = <T>(moduleId: string) => {
  const relativeModuleId = (pathModule.isAbsolute(moduleId) ? pathModule.relative(baseDir, moduleId) : moduleId).split('\\').join('/').replace(baseDir + '/', '');
  switch(relativeModuleId) {
    case ".graphclient/sources/friendfries/introspectionSchema":
      return Promise.resolve(importedModule$0) as T;
    
    default:
      return Promise.reject(new Error(`Cannot find module '${relativeModuleId}'.`));
  }
};

const rootStore = new MeshStore('.graphclient', new FsStoreStorageAdapter({
  cwd: baseDir,
  importFn,
  fileType: "ts",
}), {
  readonly: true,
  validate: false
});

export const rawServeConfig: YamlConfig.Config['serve'] = undefined as any
export async function getMeshOptions(): Promise<GetMeshOptions> {
const pubsub = new PubSub();
const sourcesStore = rootStore.child('sources');
const logger = new DefaultLogger("GraphClient");
const cache = new (MeshCache as any)({
      ...({} as any),
      importFn,
      store: rootStore.child('cache'),
      pubsub,
      logger,
    } as any)

const sources: MeshResolvedSource[] = [];
const transforms: MeshTransform[] = [];
const additionalEnvelopPlugins: MeshPlugin<any>[] = [];
const friendfriesTransforms = [];
const additionalTypeDefs = [] as any[];
const friendfriesHandler = new GraphqlHandler({
              name: "friendfries",
              config: {"endpoint":"https://gateway-arbitrum.network.thegraph.com/api/6dbf780f09e4aab821388ccf2892cc78/subgraphs/id/AQL2hBo9CeiaCNP2Ks3iJHVo1iXiBgAVJBXJwnta9Xny"},
              baseDir,
              cache,
              pubsub,
              store: sourcesStore.child("friendfries"),
              logger: logger.child("friendfries"),
              importFn,
            });
sources[0] = {
          name: 'friendfries',
          handler: friendfriesHandler,
          transforms: friendfriesTransforms
        }
const additionalResolvers = [] as any[]
const merger = new(BareMerger as any)({
        cache,
        pubsub,
        logger: logger.child('bareMerger'),
        store: rootStore.child('bareMerger')
      })
const documentHashMap = {
        "c3873dd1eb35e33cd87d04d18f6a2eaccd89b4806451d2f5b7d6e39367ce9c16": LatestBountiesDocument,
"c3873dd1eb35e33cd87d04d18f6a2eaccd89b4806451d2f5b7d6e39367ce9c16": LeaderboardDocument,
"c3873dd1eb35e33cd87d04d18f6a2eaccd89b4806451d2f5b7d6e39367ce9c16": ProfileDetailsDocument,
"c3873dd1eb35e33cd87d04d18f6a2eaccd89b4806451d2f5b7d6e39367ce9c16": ProfileBountiesDocument
      }
additionalEnvelopPlugins.push(usePersistedOperations({
        getPersistedOperation(key) {
          return documentHashMap[key];
        },
        ...{}
      }))

  return {
    sources,
    transforms,
    additionalTypeDefs,
    additionalResolvers,
    cache,
    pubsub,
    merger,
    logger,
    additionalEnvelopPlugins,
    get documents() {
      return [
      {
        document: LatestBountiesDocument,
        get rawSDL() {
          return printWithCache(LatestBountiesDocument);
        },
        location: 'LatestBountiesDocument.graphql',
        sha256Hash: 'c3873dd1eb35e33cd87d04d18f6a2eaccd89b4806451d2f5b7d6e39367ce9c16'
      },{
        document: LeaderboardDocument,
        get rawSDL() {
          return printWithCache(LeaderboardDocument);
        },
        location: 'LeaderboardDocument.graphql',
        sha256Hash: 'c3873dd1eb35e33cd87d04d18f6a2eaccd89b4806451d2f5b7d6e39367ce9c16'
      },{
        document: ProfileDetailsDocument,
        get rawSDL() {
          return printWithCache(ProfileDetailsDocument);
        },
        location: 'ProfileDetailsDocument.graphql',
        sha256Hash: 'c3873dd1eb35e33cd87d04d18f6a2eaccd89b4806451d2f5b7d6e39367ce9c16'
      },{
        document: ProfileBountiesDocument,
        get rawSDL() {
          return printWithCache(ProfileBountiesDocument);
        },
        location: 'ProfileBountiesDocument.graphql',
        sha256Hash: 'c3873dd1eb35e33cd87d04d18f6a2eaccd89b4806451d2f5b7d6e39367ce9c16'
      }
    ];
    },
    fetchFn,
  };
}

export function createBuiltMeshHTTPHandler<TServerContext = {}>(): MeshHTTPHandler<TServerContext> {
  return createMeshHTTPHandler<TServerContext>({
    baseDir,
    getBuiltMesh: getBuiltGraphClient,
    rawServeConfig: undefined,
  })
}


let meshInstance$: Promise<MeshInstance> | undefined;

export const pollingInterval = null;

export function getBuiltGraphClient(): Promise<MeshInstance> {
  if (meshInstance$ == null) {
    if (pollingInterval) {
      setInterval(() => {
        getMeshOptions()
        .then(meshOptions => getMesh(meshOptions))
        .then(newMesh =>
          meshInstance$.then(oldMesh => {
            oldMesh.destroy()
            meshInstance$ = Promise.resolve(newMesh)
          })
        ).catch(err => {
          console.error("Mesh polling failed so the existing version will be used:", err);
        });
      }, pollingInterval)
    }
    meshInstance$ = getMeshOptions().then(meshOptions => getMesh(meshOptions)).then(mesh => {
      const id = mesh.pubsub.subscribe('destroy', () => {
        meshInstance$ = undefined;
        mesh.pubsub.unsubscribe(id);
      });
      return mesh;
    });
  }
  return meshInstance$;
}

export const execute: ExecuteMeshFn = (...args) => getBuiltGraphClient().then(({ execute }) => execute(...args));

export const subscribe: SubscribeMeshFn = (...args) => getBuiltGraphClient().then(({ subscribe }) => subscribe(...args));
export function getBuiltGraphSDK<TGlobalContext = any, TOperationContext = any>(globalContext?: TGlobalContext) {
  const sdkRequester$ = getBuiltGraphClient().then(({ sdkRequesterFactory }) => sdkRequesterFactory(globalContext));
  return getSdk<TOperationContext, TGlobalContext>((...args) => sdkRequester$.then(sdkRequester => sdkRequester(...args)));
}
export type LatestBountiesQueryVariables = Exact<{ [key: string]: never; }>;


export type LatestBountiesQuery = { bounties: Array<(
    Pick<Bounty, 'id' | 'blockTimestamp' | 'title' | 'description' | 'image' | 'individualReward' | 'bountyNumber' | 'maxParticipants' | 'numParticipants' | 'owner' | 'rewarded' | 'status' | 'deadline'>
    & { participants: Array<Pick<BountyParticipant, 'id' | 'rewarded'>> }
  )> };

export type LeaderboardQueryVariables = Exact<{ [key: string]: never; }>;


export type LeaderboardQuery = { participants: Array<Pick<Participant, 'id' | 'totalRewards'>> };

export type ProfileDetailsQueryVariables = Exact<{
  address: Scalars['ID']['input'];
}>;


export type ProfileDetailsQuery = { participant?: Maybe<(
    Pick<Participant, 'id' | 'totalRewards'>
    & { participated: Array<Pick<BountyParticipant, 'id'>> }
  )> };

export type ProfileBountiesQueryVariables = Exact<{
  address: Scalars['Bytes']['input'];
}>;


export type ProfileBountiesQuery = { bounties: Array<Pick<Bounty, 'id' | 'blockTimestamp' | 'title' | 'description' | 'image' | 'individualReward' | 'bountyNumber' | 'maxParticipants' | 'numParticipants' | 'owner' | 'rewarded' | 'status' | 'deadline'>> };


export const LatestBountiesDocument = gql`
    query LatestBounties {
  bounties(first: 15, orderBy: blockTimestamp, orderDirection: desc) {
    id
    blockTimestamp
    title
    description
    image
    individualReward
    bountyNumber
    maxParticipants
    numParticipants
    participants(first: 50) {
      id
      rewarded
    }
    owner
    rewarded
    status
    deadline
  }
}
    ` as unknown as DocumentNode<LatestBountiesQuery, LatestBountiesQueryVariables>;
export const LeaderboardDocument = gql`
    query Leaderboard {
  participants(orderBy: totalRewards, orderDirection: desc) {
    id
    totalRewards
  }
}
    ` as unknown as DocumentNode<LeaderboardQuery, LeaderboardQueryVariables>;
export const ProfileDetailsDocument = gql`
    query ProfileDetails($address: ID!) {
  participant(id: $address) {
    id
    totalRewards
    participated(first: 50) {
      id
    }
  }
}
    ` as unknown as DocumentNode<ProfileDetailsQuery, ProfileDetailsQueryVariables>;
export const ProfileBountiesDocument = gql`
    query ProfileBounties($address: Bytes!) {
  bounties(
    first: 50
    orderBy: blockTimestamp
    orderDirection: desc
    where: {owner: $address}
  ) {
    id
    blockTimestamp
    title
    description
    image
    individualReward
    bountyNumber
    maxParticipants
    numParticipants
    owner
    rewarded
    status
    deadline
  }
}
    ` as unknown as DocumentNode<ProfileBountiesQuery, ProfileBountiesQueryVariables>;





export type Requester<C = {}, E = unknown> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R> | AsyncIterable<R>
export function getSdk<C, E>(requester: Requester<C, E>) {
  return {
    LatestBounties(variables?: LatestBountiesQueryVariables, options?: C): Promise<LatestBountiesQuery> {
      return requester<LatestBountiesQuery, LatestBountiesQueryVariables>(LatestBountiesDocument, variables, options) as Promise<LatestBountiesQuery>;
    },
    Leaderboard(variables?: LeaderboardQueryVariables, options?: C): Promise<LeaderboardQuery> {
      return requester<LeaderboardQuery, LeaderboardQueryVariables>(LeaderboardDocument, variables, options) as Promise<LeaderboardQuery>;
    },
    ProfileDetails(variables: ProfileDetailsQueryVariables, options?: C): Promise<ProfileDetailsQuery> {
      return requester<ProfileDetailsQuery, ProfileDetailsQueryVariables>(ProfileDetailsDocument, variables, options) as Promise<ProfileDetailsQuery>;
    },
    ProfileBounties(variables: ProfileBountiesQueryVariables, options?: C): Promise<ProfileBountiesQuery> {
      return requester<ProfileBountiesQuery, ProfileBountiesQueryVariables>(ProfileBountiesDocument, variables, options) as Promise<ProfileBountiesQuery>;
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;