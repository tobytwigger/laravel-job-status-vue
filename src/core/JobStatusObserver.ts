import {AssociativeObject} from "../types/core";
import JobStatusNotifierPool from "./JobStatusNotifierPool";
import JobStatusNotifier from "./JobStatusNotifier";
import JobStatusClient from "./JobStatusClient";

class JobStatusObserver {

    interval: NodeJS.Timer|null = null;

    poll(jobAlias: string, tags: AssociativeObject, ms: number = 5000) : JobStatusNotifier {
        this.addInterval(jobAlias, tags, setInterval(() => this.update(jobAlias, tags), ms));
        return this.getNotifier(jobAlias, tags);
    }

    getNotifier(jobAlias: string, tags: AssociativeObject): JobStatusNotifier {
        return JobStatusNotifierPool.getInstance().get(jobAlias, tags);
    }

    update(jobAlias: string, tags: AssociativeObject) {
        JobStatusNotifierPool.getInstance().get(jobAlias, tags).triggerLoading();
        JobStatusClient.getInstance().get(jobAlias, tags)
            .then(jobStatus => JobStatusNotifierPool.getInstance().get(jobAlias, tags).triggerUpdate(jobStatus))
            .catch(error => JobStatusNotifierPool.getInstance().get(jobAlias, tags).triggerError(error))
            .finally(() => JobStatusNotifierPool.getInstance().get(jobAlias, tags).triggerFinishedLoading());
    }

    private addInterval(jobAlias: string, tags: AssociativeObject, interval: NodeJS.Timer) {
        this.interval = interval;
    }

    cleanup(jobAlias: string, tags: AssociativeObject) {
        if(this.interval !== null) {
            clearInterval(this.interval);
        }
        this.interval = null;
    }
}

export default JobStatusObserver