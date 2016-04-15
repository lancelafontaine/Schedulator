import urllib.request
import time

numOfRequests = 10000

def makeRequests(numOfRequests):
    for index in range(numOfRequests):
        f = urllib.request.urlopen('http://159.203.40.62:3000')
        if index == 0:
            initialCode = f.getcode()
        if index == numOfRequests - 1:
            endCode = f.getcode()
        index += 1
    return [initialCode, endCode]

print('Stress testing web application. Please wait...')
startTime = time.time()
results = makeRequests(numOfRequests);
elapsedTime = time.time() - startTime

requestsPerSecond = numOfRequests / elapsedTime
systemIsUp = results[0] == results[1]

print('---')
print('Numer of requests: ' + str(numOfRequests))
print('Number of seconds: ' + str(elapsedTime))
print('Number of requests per second: ' + str(requestsPerSecond))
print('System is still operational: '+ str(systemIsUp))
