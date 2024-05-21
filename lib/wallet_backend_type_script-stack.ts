import { Stack, StackProps, CfnOutput } from 'aws-cdk-lib';
import { UserPool, UserPoolClient, CfnIdentityPool } from 'aws-cdk-lib/aws-cognito';
import { Construct } from 'constructs';
import { CfnApp } from 'aws-cdk-lib/aws-amplify';


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

    const userPool = new UserPool(this, 'crypto-wallet-user-pool', {
      userPoolName: 'crypto-wallet-user-pool',
      autoVerify: {
        email: true,
      },
      signInAliases: {
        email: true,
      },
      passwordPolicy,
      selfSignUpEnabled: true,
    });

    const userPoolClient = new UserPoolClient(this, 'crypto-wallet-user-pool-client', {
      userPool,
      authFlows: {
        userPassword: true,
      },
    });

    new CfnOutput(this, 'UserPoolId', { value: userPool.userPoolId });
    new CfnOutput(this, 'UserPoolClientId', { value: userPoolClient.userPoolClientId });

    const amplifyApp = new CfnApp(this, 'crypto-wallet-auth-amplify-app', {
      name: 'crypto-wallet-amplify-app',
    });
 }
}
