parent.cxone('chat', 'setCustomCss', '[data-selector="ACTIVITY_BAR"] {display: none !important;}');
console.log("activity_bar hidden");

parent.cxone('chat', 'onPushUpdate', ['CaseToRoutingQueueAssignmentChanged'], pushUpdatePayload => {
    if (!pushUpdatePayload?.data) {
        return;
    }

    const skillIdTest = pushUpdatePayload.data.routingQueue?.skillId;
    const hiddenSkillIds = [20899728, 20899729, 23125510, 23125511]; // Add more skill IDs here as needed

    if (hiddenSkillIds.includes(skillIdTest)) {
        console.log(pushUpdatePayload);
        parent.cxone('chat', 'setCustomCss', '[data-selector="ACTIVITY_BAR"] {display: block !important;}  [data-selector="REPLY_BOX"] {display: block !important;}');
        console.log("ACTIVITY_BAR and REPLY_BOX shown");
    } else {
        console.log(pushUpdatePayload);
        parent.cxone('chat', 'setCustomCss', '[data-selector="ACTIVITY_BAR"] {display: none !important;} [data-selector="REPLY_BOX"] {display: none !important;}');
        console.log("ACTIVITY_BAR and REPLY_BOX hidden");
    }
});

parent.cxone('chat', 'onPushUpdate', ['MessageAddedIntoCase'], pushUpdatePayload => {
    if (typeof pushUpdatePayload === 'undefined' || typeof pushUpdatePayload.data === 'undefined') {
        return;
    }

    const contentStringTest = pushUpdatePayload.data.message.messageContent.payload?.text;

    if (typeof contentStringTest === 'string') {
        const normalizedText = contentStringTest.toLowerCase().trim().replace(/\s+/g, ' ');

        if (
            normalizedText.includes("our office is currently closed")
        ) {
            console.log(pushUpdatePayload);
            parent.cxone('chat', 'setCustomCss', '[data-selector="ACTIVITY_BAR"] {display: none !important;} [data-selector="REPLY_BOX"] {display: none !important;}');
            console.log("ACTIVITY_BAR and REPLY_BOX  hidden");
        } else {
            console.log(pushUpdatePayload);
            
            console.log("doesn't matter");
        }
    }
});

function startMonitoringChanges(mutations) {
  // Loop through all mutations
  mutations.forEach((mutation) => {
    // Loop through added nodes

    for (let node of mutation.addedNodes) {
      console.log(node);
      // If the added node is not an HTML element then skip
      if (!(node instanceof HTMLElement)) continue;
      if ( node.matches("[data-selector=WINDOW]") || node.matches('[class^="UserProfile_UserProfile__"]') || node.matches('[data-selector=PRECONTACT_SURVEY]')) {
        callBrandembassyFunction();
      }
    }
  });
}

//function is used to remove the StartNewchat button from Endsession page
function callBrandembassyFunction() {
  debugger;
let testhccwindowlocation = top.location.href;
let urlParse;
if (testhccwindowlocation.includes("/account")) {
  urlParse = "oss-account";
} else if  (testhccwindowlocation.includes("auto" && "quote-review")) {
  urlParse = "quote-review";
} else if  (testhccwindowlocation.includes("auto" && "extra-details")) {
  urlParse = "extra-details";
} else if  (testhccwindowlocation.includes("auto" && "verify-details")) {
  urlParse = "verify-details";
} else if  (testhccwindowlocation.includes("auto" && "payment")) {
  urlParse = "payment";
} else if  (testhccwindowlocation.includes("auto" && "final-review")) {
  urlParse = "final-review";
} else if  (testhccwindowlocation.includes("auto" && "application-info")) {
  urlParse = "application-info";
} else if  (testhccwindowlocation.includes("auto")) {
  urlParse = "auto";
} else if  (testhccwindowlocation.includes("hab")) {
  urlParse = "hab";
} else {
  urlParse = "oss-default";
}
  parent.brandembassy("setCaseCustomField", "crm_url_location", urlParse);
}

setTimeout(() => {
  let beMessengerWindow = document.getElementById("be-messenger");
  let observer = new MutationObserver(startMonitoringChanges);

  observer.observe(beMessengerWindow, {
    childList: true,
    subtree: true,
  });
}, "200");
