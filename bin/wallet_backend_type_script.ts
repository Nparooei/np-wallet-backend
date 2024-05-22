#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CognitoUserPoolStack } from '../lib/wallet_backend_type_script-stack';

const app = new cdk.App();
new CognitoUserPoolStack(app, 'WalletBackendTypeScriptStack', {

});