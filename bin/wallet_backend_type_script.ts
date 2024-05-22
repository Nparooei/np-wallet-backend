#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { CognitoUserPoolStack } from "../lib/CognitoUserPoolStack";

const app = new cdk.App();
new CognitoUserPoolStack(app, "CognitoUserPoolStack", {});
