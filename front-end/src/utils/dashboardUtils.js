export function mapData(data) {
    let total = data.length
    let done = 0
    let notDone = 0
    const result = data.reduce((map, item) => {
        const timeline = item.timeline;

        if (!map.has(timeline)) {
            map.set(timeline, [0, 0, 0]); // [total, done, notDone]
        }

        const stats = map.get(timeline);

        stats[0] += 1; // total

        if (item.status === "Done" || item.status === "Completed") {
            stats[1] += 1; // done
        } else {
            stats[2] += 1; // notDone
        }

        return map;
    }, new Map());
    for (const [key, value] of result) {
        done += value[1]
        notDone += value[2]
    }
    return { result, total, done, notDone }
}

export function transformData(mapData) {
    const timelineArr = ['Pre_Tet', 'During_Tet', 'After_Tet']
    const timelineColors = {
        'Pre_Tet': 'var(--color-success)',
        'During_Tet': 'var(--color-primary)',
        'After_Tet': 'var(--color-accent)'
    };

    const innerData = timelineArr.map((timeline) => {

        const stats = mapData.get(timeline) ?? [0, 0, 0];

        return {
            id: timeline,
            label: timeline.split("_").join(" "),
            value: stats[0],
            color: timelineColors[timeline],
        };
    });

    const outerData = timelineArr.map((timeline) => {

        const stats = mapData.get(timeline) ?? [0, 0, 0];

        return [
            {
                label: "Done",
                value: stats[1],
                color: timelineColors[timeline],
            },
            {
                label: "Not Done",
                value: stats[2],
                color: `color-mix(in srgb, ${timelineColors[timeline]}, transparent 40%)`,
            }
        ];
    })
        .flat();

    return { innerData, outerData };
}

export function calPercentage(done, total) {
    if (done === 0 && total === 0) {
        return 0
    } else {
        return Math.round((done / total) * 100)
    }
}

export function mapDataDued(data) {
    const dataNotDone = data.filter(item => item.status != "Completed" && item.status != "Done")

    const dateNow = new Date().toISOString().split('T')[0];
    let result = 0
    dataNotDone.forEach(item => {
        const day = new Date(item.duedTime).toISOString().split('T')[0];

        if (day === dateNow) {
            result++
        }

    });

    return result
}

export function reminderNoti(tasks, items) {
    let noti = ""

    if (tasks === 0 && items === 0) {
        noti = "You have no quests for today!"
    } else if (tasks != 0 && items === 0) {
        noti = `You have ${tasks} task(s) to do today.`
    } else if (items != 0 && tasks === 0) {
        noti = `You have ${items} item(s) to do today.`
    } else {
        noti = `You have ${tasks} task(s), ${items} item(s) to do today.`
    }
    return noti
}


export function progressTaskColor (tasksDone) {
    if (tasksDone === 0) {
        return "#AEA9B1";
    }

    if (tasksDone >= 70) {
        return "var(--color-success)";
    }

    return "#0043CE";
};

export function progressBudgetColor (budgetSpent) {
    if (budgetSpent === 0) {
        return "#AEA9B1";
    }

    if (budgetSpent >= 95) {
        return "var(--color-danger)";
    }

    if (budgetSpent >= 80) {
        return "var(--color-accent)";
    }

    return "var(--color-success)";
};
