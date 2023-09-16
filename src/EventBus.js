const EventBus = (() => { 
  // Internal dictionary to hold topics and their subscribers
  const topics = {};

  // Publish function
  function publish(eventType, event) {
    if (DEBUG_MODE) console.log(`[Publish] event of type ${eventType} with contents (${JSON.stringify(event)})`);

    const subscriberList = topics[eventType];

    if (subscriberList) {
      if (DEBUG_MODE) console.log(`...${subscriberList.length} subscriptions being executed for this event.`);
      
      const orphanedSubscriptions = [];

      subscriberList.forEach((subscription, index) => {
        if (subscription.callback) {
          subscription.callback(event);
        } else {
          orphanedSubscriptions.push(index);
        }
      });

      orphanedSubscriptions.reverse().forEach((index) => {
        subscriberList.splice(index, 1);
      });
    } else {
      if (DEBUG_MODE) console.log('...but no one is subscribed to this event right now.');
    }
  }

  // Subscribe function
  function subscribe(eventType, callback) {
    if (!topics[eventType]) {
      topics[eventType] = [];
    }
    
    const newSubscription = { callback };

    topics[eventType].push(newSubscription);

    if (DEBUG_MODE) console.log(`[Subscribe] subscription of function (${callback.name}) to type ${eventType}. There are now ${topics[eventType].length} subscriptions to this type.`);

    return newSubscription;
  }

  // Unsubscribe function
  function unsubscribe(eventType, subscription) {
    const subscriberList = topics[eventType];

    if (subscriberList) {
      const index = subscriberList.indexOf(subscription);

      if (index !== -1) {
        subscriberList.splice(index, 1);
        if (DEBUG_MODE) console.log(`...there are now ${subscriberList.length} subscriptions to this type.`);
      }
    } else {
      if (DEBUG_MODE) console.log(`[Unsubscribe] attempting to remove subscription to type ${eventType}...but this subscription is not currently valid (perhaps you already unsubscribed?)`);
    }
  }

  return {
    publish,
    subscribe,
    unsubscribe
  };
})();
