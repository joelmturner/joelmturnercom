import React from "react"
import { Layout } from "../components"
import Policy from "../utils/content-snippets/privacy-policy.mdx"

type PrivacyPolicyProps = {}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = () => (
  <Layout>
    <Policy />
  </Layout>
)

export default PrivacyPolicy;