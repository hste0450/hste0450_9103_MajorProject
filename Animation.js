class Animation {
    constructor(target, propertyName, options) {
        this.target = target;
        this.propertyName = propertyName;
        this.startValue = options.startValue;
        this.endValue = options.endValue;
        this.duration = options.duration;
        this.startTime = Date.now();
        this.complete = false;
    }

    update() {
        const currentTime = Date.now();
        const elapsedTime = currentTime - this.startTime;
        let progress = elapsedTime / this.duration;
        
        if (progress >= 1) {
            progress = 1;
            this.complete = true;
        }

        const newValue = this.startValue + (this.endValue - this.startValue) * progress;
        this.target[this.propertyName] = newValue;

        // Ensure the target class recalculates dependent values
        if (this.target.updateRadius) {
            this.target.updateRadius(newValue);
        }
    }

    isComplete() {
        return this.complete;
    }
}
