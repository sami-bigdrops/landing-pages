import js from "@eslint/js"
import eslintConfigPrettier from "eslint-config-prettier"
import onlyWarn from "eslint-plugin-only-warn"
import turboPlugin from "eslint-plugin-turbo"
import tseslint from "typescript-eslint"

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config}
 * */
export const config = [
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    plugins: {
      turbo: turboPlugin,
    },
    rules: {
      "turbo/no-undeclared-env-vars": [
        "warn",
        {
          allowList: [
            "NODE_ENV",
            "DATABASE_URL",
            "LEADPROSPER_CAMPAIGN_ID",
            "LEADPROSPER_SUPPLIER_ID",
            "LEADPROSPER_API_KEY",
            "LEADPROSPER_API_URL",
            "VERIPHONE_API_KEY",
            "AWS_REGION",
            "AWS_ACCESS_KEY_ID",
            "AWS_SECRET_ACCESS_KEY",
            "AWS_SES_FROM_EMAIL",
            "SES_REPLY_TO",
            "SITE_URL",
            "NEXT_PUBLIC_SITE_URL",
            "SES_EMAIL_UNSUBSCRIBE_URL",
            "SES_EMAIL_FOOTER_ADDRESS",
            "TEST_EMAIL",
          ],
        },
      ],
    },
  },
  {
    plugins: {
      onlyWarn,
    },
  },
  {
    ignores: ["dist/**"],
  },
]
