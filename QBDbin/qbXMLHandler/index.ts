import  data2xml from 'data2xml';

const convert = data2xml({
    xmlHeader: '<?xml version="1.0" encoding="utf-8"?>\n<?qbxml version="13.0"?>\n'
});

interface QBXMLResponse {
    [key: string]: any;
}

interface QBXMLHandler {
    fetchRequests(callback: (err: any, requestArray: string[]) => void): void;
    handleResponse(response: QBXMLResponse): void;
    didReceiveError(error: QBXMLResponse): void;
}

function buildRequests(callback: (err: any, requestArray: string[]) => void): void {
    console.log('1 from qbxml: ');
 
    const requests: string[] = [];
    const xml = convert(
        'QBXML',
        {
            QBXMLMsgsRq: {
                _attr: { onError: 'stopOnError' },
                ItemInventoryQueryRq: {
                    MaxReturned: 1000,
                },
            },
        }
    );
    requests.push(xml);

    callback(null, requests);
}

const QBXMLHandler: QBXMLHandler = {
    fetchRequests: buildRequests,
    handleResponse: (response: QBXMLResponse) => {
        console.log('1 from qbxml: ');
      
    },
    didReceiveError: (error: QBXMLResponse) => {
        console.log('2 from qbxml: ');

        console.log('error: ', error);
    },
};

export default QBXMLHandler;
