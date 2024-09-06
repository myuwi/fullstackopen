import config from "./utils/config.js";
import app from "./app.js";
import logger from "./utils/logger.js";

app.listen(config.PORT, () =>
  logger.info(`Server running on port ${config.PORT}`),
);
