export function formatIsoDate(date: string | null) {
    // from "yyyy/MM/dd HH:MM:ss" to "yyyy-mm-ddThh:mm"
    if (date == null) {
        return null;
    }
    const dateParts = date.split(" ");
    const datePart = dateParts[0].split("/");
    const time = dateParts[1].substring(0, 5);

    const year = datePart[0];
    const month = datePart[1];
    const day = datePart[2];

    return `${year}-${month}-${day}T${time}`;
};

export function formatSSDate(date: string | null): string | null {
    // from "yyyy-mm-ddTHH:MM" to "yyyy/MM/dd HH:MM:ss"
    if (date == null) {
        return null;
    }
    const dateParts = date.split("T");
    const datePart = dateParts[0].split("-");
    let time = dateParts[1].substring(0, 8);

    if (time.length == 5) time += ":00";

    const year = datePart[0];
    const month = datePart[1];
    const day = datePart[2];

    return `${year}/${month}/${day} ${time}`;
};

export function getColor(): string {
    const hue = Math.floor(Math.random() * 360);
    const saturation = Math.floor(Math.random() * (100 - 70) + 100);
    const lightness = Math.floor(Math.random() * (50 - 40) + 50);

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

export function formatDistance(distance: number): string {
    if (distance == 0) {
        return "0";
    }
    if (distance > 1000) {
        return `${(distance / 1000).toFixed(2)} KM`;
    }
    return `${Math.ceil(distance)}m`;
};

export function EnumToArray(
    e: object
): { keys: string[]; values: number[] | string[] } {
    const keys = Object.keys(e);
    const values = Object.values(e);

    return {
        keys,
        values,
    };
};
export function getBase64StringFromDataURL(dataURL: any): any {
    if (dataURL) return String(dataURL).replace("data:", "").replace(/^.+,/, "");
};

export function toBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(getBase64StringFromDataURL(reader.result));
        reader.onerror = reject;
    });
}
export function convertBlobToBase64(
    blob: Blob
): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = reject;
        reader.onload = () => {
            resolve(getBase64StringFromDataURL(reader.result));
        };
        reader.readAsDataURL(blob);
    });
}

export function isValidEmail(email: string): boolean {
    const pattern =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(email);
};

export function isNullOrEmpty(string: string | null): boolean {
    return (
        string == null ||
        string == "" ||
        string == undefined ||
        typeof string != "string"
    );
};

export function handleVirtualKeyboard(model: string, value: string): string {

    if (value == "space") {
        model += " ";
    } else if (value == "backspace") {
        model = model.toString().slice(0, -1);
    } else {
        model += value.toString();
    }

    return model
}

export function handleNumPad(model: number, value: string): number {

    if (value == "backspace") {
        model = Number(model.toString().slice(0, -1));
    } else {
        model = Number(model.toString() + value.toString());
    }

    return model
}

export function dateHasPassedOffset(dateToCheck: Date, offset: number): boolean {

    var currentDate = new Date();

    currentDate.setSeconds(currentDate.getSeconds() - offset);

    var currentDateUnixTimestamp = currentDate.getTime();
    var dateToCheckUnixTimestamp = dateToCheck.getTime();

    return dateToCheckUnixTimestamp < currentDateUnixTimestamp;
}

export function ObjectToArray(
    e: object
): { keys: string[]; values: number[] | string[] } {
    const keys = Object.keys(e);
    const values = Object.values(e);

    return {
        keys,
        values,
    };
};


enum ISortDirections {
    desc = "desc",
    asc = "asc",
}

export function sortBy<T>(
    array: T[],
    sortBy: string,
    sortDirection: string = ISortDirections.desc
): T[] {
    if (!EnumToArray(ISortDirections).keys.includes(sortDirection)) {
        throw new Error("Sort direction should be either 'desc' or 'asc'");
    }
    return array.sort((a, b) =>
        a[sortBy as keyof T] > b[sortBy as keyof T]
            ? sortDirection == ISortDirections.desc
                ? -1
                : 1
            : b[sortBy as keyof T] > a[sortBy as keyof T]
                ? sortDirection == ISortDirections.desc
                    ? 1
                    : -1
                : 0
    );
};