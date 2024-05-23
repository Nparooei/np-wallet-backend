import { Stack, StackProps } from "aws-cdk-lib";
import { UserPool, UserPoolClient } from "aws-cdk-lib/aws-cognito";
import { Construct } from "constructs";

export class CognitoUserPoolStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const passwordPolicy = {
      minLength: 8,
      requireUppercase: false,
      requireLowercase: false,
      requireNumbers: false,
      requireSymbols: false,
    };

    const userPool = new UserPool(this, "crypto-wallet-user-pool", {
      userPoolName: "crypto-wallet-user-pool",
      autoVerify: {
        email: true,
      },
      signInAliases: {
        email: true,
      },
      passwordPolicy,
      selfSignUpEnabled: true,
    });

    new UserPoolClient(
      this,
      "crypto-wallet-user-pool-client",
      {
        userPool,
        authFlows: {
          userPassword: true,
        },
      },
    );
  }
}
