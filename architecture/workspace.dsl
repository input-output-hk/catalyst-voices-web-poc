/*
Governance Voting Center
*/
workspace "Governance Voting Center" {
    !docs ./documentation
    !adrs ./decisions

    model {

        user = person "User" "😎"

        browser = softwareSystem "Browser" "Firefox, Chrome, Safari, Edge" "Browser"

        cardanoWallet = softwareSystem "Cardano Wallet" "" "Existing Software System"

        hwWallet = softwareSystem "HW Wallet" "Cardano Hardware Wallet" "Existing Software System"

        blockFrost = softwareSystem "Blockfrost API" "" "Existing Software System"

        gvcFrontEnd = softwareSystem "Goverance Voting Center Frontend" "React App @gvc/voting-center-frontend" ""{

            // Rough react app
            reactApp = container "React App" "" {
                httpClient = component "HTTP Client" ""
                ui = component "UI" "components, containers, assets" ""
                walletConector = component "walletConnect" "/lib/wallet-connect/"
                context = component "App context provider" "/lib/context.js"
                helpers = component "helpers" "/lib/helpers.js"
            }
        }

        // Group of software that offers Catalyst open API endpoints 
        govAPIsGroup = group "Open Catalyst API" {

            // Jormungandr node instance
            jormungandrNode = softwareSystem "Jormungandr Node" "Collects chain state data @catalyst-core/jormungandr" "Existing Software System"

            // VIT-SS
            servicingStation = softwareSystem "VIT Servicing Station" "Collects Catalyst fund and voter data @catalyst-core/vit-servicing-station" "Existing Software System"
            
            // GVC Backend
            gvcBackEnd = softwareSystem "Goverance Voting Center Backend" "Strapi CMS @gvc/voting-center-backend" {
                // Open dRep Database
                gvcDatabase = container "GVC Database" "" "PostgreSQL Database" "Database"

                // Serivce / API end points to access the database
                apiService = container "HTTP Server" "Offers REST endpoints for accessing GVC database"{
                    
                    apiBroker = component "expressAPI" ""
                    // Private
                    delegationAPI = component "delegation" "api/delegation"
                    dRepPrivatePolicyAPI = component "drep-privacy-policy" "api/drep-privacy-policy"
                    dRepTosPolicyAPI = component "drep-tos-policy" "api/drep-tos-policy"
                    privacyPolicyAPI = component "privacy-policy" "api/privacy-policy"
                    termsAndConditionAPI = component "terms-and-condition" "api/terms-and-condition"
                    voterAPI = component "voter" "api/voter"
                    blockFrostAPI = component "blockfrost" "api/blockfrost"
                    cborAPI = component "cbor-decode" "api/cbor-decode"
                    // Public
                    dRepAPI = component "drep" "api/drep"

                    // Relationships within apiService
                    apiBroker -> delegationAPI "routes"
                    apiBroker -> dRepPrivatePolicyAPI "routes"
                    apiBroker -> dRepTosPolicyAPI "routes"
                    apiBroker -> privacyPolicyAPI "routes"
                    apiBroker -> termsAndConditionAPI "routes"
                    apiBroker -> voterAPI "routes"
                    apiBroker -> dRepAPI "routes"
                    apiBroker -> cborAPI "routes"
                    // to external things
                    apiBroker -> blockFrostAPI "routes"
                }

                // Relationships within GVC backend
                delegationAPI -> gvcDatabase "interfaces"
                dRepPrivatePolicyAPI -> gvcDatabase "interfaces"
                dRepTosPolicyAPI -> gvcDatabase "interfaces"
                privacyPolicyAPI -> gvcDatabase "interfaces"
                termsAndConditionAPI -> gvcDatabase "interfaces"
                voterAPI -> gvcDatabase "interfaces"
                dRepAPI -> gvcDatabase "interfaces"

            }

            // Relationships within govAPIs group
            servicingStation -> apiBroker "Makes API calls to [REST API]"

        }

        // Frontend fetches data from VIT-SS and jorm
        httpClient -> servicingStation "Makes API calls to [VIT REST API]"
        httpClient -> jormungandrNode "Makes API calls to [Voting Ledger REST APIs]"
        // Frontend interfaces with backend
        httpClient -> apiBroker "interfaces [GVC REST API]"
        // Frontend connects to wallet over CIP-62 API
        walletConector -> cardanoWallet "interfaces\n[CIP-62 API]"
        // GVC backend uses blockfrost to verify transactions
        blockFrostAPI -> blockFrost "checks transaction status"

        // User uses the browser based frontend
        user -> browser "uses"
        browser -> gvcFrontEnd "connects"
        // Light wallet and HW wallet
        hwWallet -> cardanoWallet "integrates"

        // User's browser attaches to GVC FE
        browser -> reactApp "connects"

    }

    views {
        
        // Landscape
        systemlandscape "SystemLandscape" {
            include *
            autoLayout lr
            title "Governance Voting Center System Landscape"
        }

        // GVC frontend View
        container gvcFrontEnd "FrontendView" {
            include *
            autoLayout lr
        }
        
        // GVC backend View
        container gvcBackEnd "BackendView" {
            include *
            autoLayout lr
        }

        // GVC backend api service view 
        component apiService "BackendAPIView" {
            include *
            autoLayout
        }

        // GVC frontend rough react app view 
        # component reactApp "FrontendAppView" {
        #     include *
        #     autoLayout
        # }

        // Colour pallette: https://colorbrewer2.org/#type=sequential&scheme=PuBu&n=4
        styles {
            element "Software System" {
                background #0570b0
                color #ffffff
                shape RoundedBox
            }

            element "Container" {
                background #74a9cf
                color #ffffff
                shape RoundedBox
            }

            element "Component" {
                background #bdc9e1
                color #ffffff
                shape RoundedBox
            }

            element "Person" {
                background #66c2a5
                color #ffffff
                shape person
            }

            element "Existing Software System" {
                background #999999
                color #ffffff
            }

            element "Browser" {
                shape WebBrowser
            }

            element "Database" {
                shape Cylinder
            }               
        }

        branding {
            logo ./images/voting-center-header.png
        }  
    }
}