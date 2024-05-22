import * as cdk from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import * as WalletBackendTypeScript from "../lib/CognitoUserPoolStack";

test("Cognito User Pool Created", () => {
  const app = new cdk.App();
  const stack = new WalletBackendTypeScript.CognitoUserPoolStack(
    app,
    "cognito-user-pool-test-stack",
  );
  const template = Template.fromStack(stack);

  template.hasResource("AWS::Cognito::UserPool", {
    DeletionPolicy: "Retain",
    UpdateReplacePolicy: "Retain",
    Properties: {
      Policies: {
        PasswordPolicy: {
          MinimumLength: 8,
          RequireLowercase: false,
          RequireSymbols: false,
          RequireUppercase: false,
        },
      },
    },
  });

  template.resourceCountIs("AWS::Cognito::UserPool", 1);
  template.resourceCountIs("AWS::Cognito::UserPoolClient", 1);
});
