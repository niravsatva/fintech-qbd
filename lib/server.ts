import http from 'http';
import fs from 'fs';
const soap = require('soap');

// Define constants
const port = process.env.QB_SOAP_PORT || 8000;
const WSDL_FILENAME = '/qbws.wsdl';

class Server {
    wsdl: any;
    webService: any;
    constructor() {
        this.wsdl = this.buildWsdl();
        this.webService = require('./web-service');
    }

    // Read the WSDL file and return its contents
    buildWsdl() {
        try {
            // Read the WSDL file from the file system
            return fs.readFileSync(__dirname + WSDL_FILENAME, 'utf8');
        } catch (error) {
            console.error('Error reading WSDL file:', error);
            return null;
        }
    }

    // Start the Quickbooks SOAP Server
    run() {
        // Create an HTTP server to handle requests
        const server = http.createServer((req: any, res: any) => {
            // Handle incoming requests and respond with a 404 message
            res.end('404: Not Found: ' + req.url);
        });

        // Start the HTTP server and log the port it's listening on
        server.listen(port, () => {
            console.log('Quickbooks SOAP Server listening on port ' + port);
        });

        // Create a SOAP server that listens on the HTTP server
        const soapServer = soap.listen(server, '/reuse-infra/qbd', this.webService.service, this.wsdl);
        soapServer.log = () => {}; // Disable SOAP server logs
    }

    // Set the QBXML handler for the web service
    setQBXMLHandler(qbXMLHandler: any) {
        // Set the QBXML handler for the web service
        this.webService.setQBXMLHandler(qbXMLHandler);
    }
}

export default new Server();
