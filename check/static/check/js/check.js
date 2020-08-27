
// A simple "class" to encapsulate Django System Check Javascript functionality
var Check = new function() {
  //The REST base url
  this.baseurl = window.location.origin;

  this.checkSystem = function() {
    var request = new XMLHttpRequest();
    request.open('GET', this.baseurl + "/check", true);

    var self = this;
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {

        // Data comes in JSON format
        var data = JSON.parse(request.responseText);
        console.log("Check success", data);

        // CPU
        const cpuInfo = document.querySelector('#cpu_info');
        cpuInfo.innerHTML = data.cpu

        // Memory
        var meminfo = "";
        for (var i in data.memory) {
          meminfo += i + ": " + data.memory[i] + " bytes <br/>";
        }
        const memInfo = document.querySelector('#memory_info');
        memInfo.innerHTML = meminfo;

        // Disk
        var diskinfo = "";
        for (var i in data.disk) {
          diskinfo += i + ": " + data.disk[i] + " bytes <br/>";
        }
        const diskInfo = document.querySelector('#disk_info');
        diskInfo.innerHTML = diskinfo;

        // When finished restart the check
        setTimeout(function() { self.checkSystem() }, 2000);
      } else {
        // We reached our target server, but it returned an error
        console.log("Check error", request);
        const errorInfo = document.querySelector('#error_info');
        errorInfo.innerHTML = "Server returned with status: " + request.status + " - " + request.statusText;

      }
    };

    request.onerror = function() {
      // There was a connection error of some sort
        console.log("Check onerror");
        const errorInfo = document.querySelector('#error_info');
        errorInfo.innerHTML = "Server returned with status: " + request.status + " - " + request.statusText;
    };

    request.send();
  }
}

// Start the check cycle
Check.checkSystem();