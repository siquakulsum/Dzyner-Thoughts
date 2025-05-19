#!/bin/bash

# Build the application
echo "Building application..."
npm run build

# Create a production-ready start script
echo "#!/bin/bash" > start-prod.sh
echo "export NODE_ENV=production" >> start-prod.sh
echo "export PORT=\${PORT:-5000}" >> start-prod.sh
echo "node dist/index.js" >> start-prod.sh
chmod +x start-prod.sh

echo "Build complete! Run './start-prod.sh' to start the application in production mode."