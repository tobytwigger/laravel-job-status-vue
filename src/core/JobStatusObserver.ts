import {AssociativeObject} from "../types/core";
import JobStatusNotifierPool from "./JobStatusNotifierPool";
import JobStatusNotifier from "./JobStatusNotifier";
import repository from "./repository";

class JobStatusObserver {

    static getInstance() {
        return new JobStatusObserver();
    }

    poll(jobAlias: string, tags: AssociativeObject, ms: number = 5000) : JobStatusNotifier {
        // TODO stop the listening in vue destruct
        setInterval(() => this.update(jobAlias, tags), ms);
        return this.bindToStatus(jobAlias, tags);
    }

    bindToStatus(jobAlias: string, tags: AssociativeObject): JobStatusNotifier {
        return JobStatusNotifierPool.getInstance().get(jobAlias, tags);
    }

    update(jobAlias: string, tags: AssociativeObject) {
        JobStatusNotifierPool.getInstance().get(jobAlias, tags).triggerLoading();
        repository.getInstance().get(jobAlias, tags)
            .then(jobStatus => JobStatusNotifierPool.getInstance().get(jobAlias, tags).triggerUpdate(jobStatus))
            .catch(error => JobStatusNotifierPool.getInstance().get(jobAlias, tags).triggerError(error))
            .finally(() => JobStatusNotifierPool.getInstance().get(jobAlias, tags).triggerFinishedLoading());
    }

}

export default JobStatusObserver