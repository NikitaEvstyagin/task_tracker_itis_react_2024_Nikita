import { gql } from "@apollo/client";

import projectFragment from "../fragments/projectFragment";

export default gql`
    query Projects{
        projects{
            ...ProjectInfo
        }
    }
    ${projectFragment}
`;