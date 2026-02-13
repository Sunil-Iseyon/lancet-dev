// This file is used for local development only
// For production with Tina Cloud, the CMS will connect directly to Tina Cloud
// and this local database is used for the build process

import { createLocalDatabase } from "@tinacms/datalayer"

export default createLocalDatabase()
