chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		console.log("Hello. This message was sent from scripts/inject.js");
		// ----------------------------------------------------------


        let seats = [];
        let prevSectionName = $('.VenueDetails__name')[0].innerText;
        let prevSectionInfo = $('.SectionStatsContainer__number').map(function(i, el) {
            return el.innerText;
        }).get().toString();
        document.addEventListener('mousedown', function() {

            let sectionName;
            getSectionName().then((response) => {
                sectionName = response;
                prevSectionName = sectionName;
                return getSectionInfo();
            }).then((sectionInfo) => {
                console.log('PrevSectionInfo is: ', prevSectionInfo);
                console.log('SectionInfo is: ', sectionInfo);
                prevSectionInfo = sectionInfo.toString();
                let numTickets = sectionInfo[0];
                let sectionPrices = sectionInfo.splice(1).toString();
                seats.push(sectionName + ',' + sectionPrices)
                console.log(seats);
            });
        })

        function getSectionName() {
            return new Promise((resolve, reject) => {
                let sectionName = $('.VenueDetails__name')[0].innerText;
                if (!sectionName || sectionName === prevSectionName) {
                    console.log('retrying secitonname');
                    setTimeout(function() {
                        resolve(getSectionName());
                    }, 2000);
                } else {
                    console.log('returned sectionName', sectionName);
                    resolve(sectionName);
                }
            });
        }

        function getSectionInfo() {
            return new Promise((resolve, reject) => {
                let sectionInfo = $('.SectionStatsContainer__number').map(function(i, el) {
                    return el.innerText;
                }).get();
                console.log('comparing section info', sectionInfo, prevSectionInfo);
                if (!sectionInfo || sectionInfo.toString() === prevSectionInfo) {
                    console.log('retrying');
                    setTimeout(function() {
                        resolve(getSectionInfo());
                    }, 2000);
                } else {
                     console.log('returned sectionName');
                    resolve(sectionInfo);
                }
            });
        }



	}
	}, 10);
});
