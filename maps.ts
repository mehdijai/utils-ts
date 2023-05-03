import { Geolocation, Position } from "@capacitor/geolocation";
import { Loader } from "@googlemaps/js-api-loader";

interface IGeoLocation {
    latitude: number;
    longitude: number;
}

const loader = new Loader({
    apiKey: config.google_maps_api, // load API KEY
    version: "weekly",
    libraries: ["drawing", "geometry", "places", "visualization"],
});

// Enable google type globally inside babelJS config

export async function setMap(
    mapRef: HTMLElement | null,
    center: google.maps.LatLngLiteral
): Promise<google.maps.Map | null> {
    const mapOptions: google.maps.MapOptions = {
        center: {
            lat: center.lat,
            lng: center.lng,
        },
        zoom: 15,
        fullscreenControl: false,
        zoomControl: false,
    };

    const google = await loader.load();
    const map = new google.maps.Map(mapRef as HTMLElement, mapOptions);

    return map;
};

export function setMarker(
    coordinate: google.maps.LatLngLiteral,
    map: google.maps.Map | null,
    icon = false
): google.maps.Marker | null {
    if (map == null) return null;
    const image =
        "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";

    const marker: google.maps.Marker = new google.maps.Marker({
        position: coordinate,
        map,
        clickable: false,
    });

    if (!icon) {
        marker.setIcon(image);
        marker.setZIndex(2);
    } else {
        marker.setZIndex(5);
    }

    return marker;
};

export function setPolyline(
    map: google.maps.Map | null,
    coordinates: google.maps.LatLngLiteral[],
    color: string
): google.maps.Polyline | null {
    if (map == null) return null;
    return new google.maps.Polyline({
        path: coordinates,
        map: map,
        strokeColor: color,
        strokeOpacity: 1.0,
        strokeWeight: 4,
        visible: true,
        zIndex: 999,
        clickable: false,
    });
};

export function setRadarCircle(
    map: google.maps.Map | null,
    center: google.maps.LatLngLiteral | null,
    radius: number,
    zIndex?: number
): google.maps.Circle | null => {
    if (map == null || center == null) {
        return null;
    }
    const color = "#fa4242";
    return new google.maps.Circle({
        strokeColor: color,
        strokeOpacity: 0.4,
        strokeWeight: 2,
        fillColor: color,
        fillOpacity: 0.2,
        map,
        center,
        radius: radius,
        clickable: false,
        zIndex: 999 - (zIndex ? zIndex : 0),
    });
};

export function drawShape(
    map: google.maps.Map | null,
    center: google.maps.LatLngLiteral,
    element: HTMLElement
): google.maps.OverlayView | null {
    if (map == null) return null;

    const bounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(center.lat, center.lng),
        new google.maps.LatLng(center.lat, center.lng)
    );

    class USGSOverlay extends google.maps.OverlayView {
        private bounds: google.maps.LatLngBounds;
        private div?: HTMLElement;

        constructor(bounds: google.maps.LatLngBounds, div: HTMLElement) {
            super();

            this.bounds = bounds;
            this.div = div;
        }

        onAdd() {
            const panes = this.getPanes();

            if (this.div) {
                this.div.style.position = "absolute";
                this.div.style.zIndex = "1000";
                this.div.style.left = "0px";
                this.div.style.top = "0px";
                panes?.overlayLayer.appendChild(this.div);
                panes?.overlayMouseTarget.appendChild(this.div);
            }
        }

        draw() {
            const overlayProjection = this.getProjection();

            const sw = overlayProjection.fromLatLngToDivPixel(
                this.bounds.getSouthWest()
            );
            const ne = overlayProjection.fromLatLngToDivPixel(
                this.bounds.getNorthEast()
            );

            if (this.div && sw && ne) {
                this.div.style.left = sw.x + "px";
                this.div.style.top = ne.y + "px";
                this.div.style.width = ne.x - sw.x + "px";
                this.div.style.height = sw.y - ne.y + "px";
            }
        }

        onRemove() {
            if (this.div) {
                (this.div.parentNode as HTMLElement).removeChild(this.div);
                delete this.div;
            }
        }

        hide() {
            if (this.div) {
                this.div.style.visibility = "hidden";
            }
        }

        show() {
            if (this.div) {
                this.div.style.visibility = "visible";
            }
        }

        toggle() {
            if (this.div) {
                if (this.div.style.visibility === "hidden") {
                    this.show();
                } else {
                    this.hide();
                }
            }
        }

        toggleDOM(map: google.maps.Map) {
            if (this.getMap()) {
                this.setMap(null);
            } else {
                this.setMap(map);
            }
        }
    }

    const overlay: google.maps.OverlayView = new USGSOverlay(bounds, element);

    overlay.setMap(map);

    return overlay;
};

const options: PositionOptions = {
    enableHighAccuracy: true,
    maximumAge: 0,
    timeout: 10 * 60 * 1000,
};

export async function getPosition(): Promise<IGeoLocation | undefined> {
    return new Promise((resolve, reject) => {
        try {
            Geolocation.getCurrentPosition(options).then(
                async (position: Position) => {
                    let pos: IGeoLocation | undefined = undefined;
                    pos = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    };
                    resolve(pos);
                }
            );
        } catch (err) {
            reject(err);
        }
    });
};


export function toLatLngLiteral(payload: IGeoLocation): google.maps.LatLngLiteral {
    return {
        lat: payload.latitude,
        lng: payload.longitude,
    };
};
export function toString (payload: IGeoLocation, ascii = true): string {
    return payload.latitude + (ascii ? "%2C" : ",") + payload.longitude;
};

export function GetSegmentCenter(
    startPoint: google.maps.LatLngLiteral,
    endPoint: google.maps.LatLngLiteral | null
): google.maps.LatLngLiteral | null {
    if (startPoint == null || endPoint == null) {
        return null;
    }

    const centerY = (startPoint.lat + endPoint.lat) / 2;
    const centerX = (startPoint.lng + endPoint.lng) / 2;

    return {
        lat: centerX,
        lng: centerY,
    };
};


export function pathGenerator(
    startPoint: google.maps.LatLngLiteral,
    pointsCount = 5
): google.maps.LatLngLiteral[] {
    const paths: google.maps.LatLngLiteral[] = [startPoint];

    for (let i = 0; i < pointsCount; i++) {
        const step = 0.0003;
        const refPoint: google.maps.LatLngLiteral =
            i == 0 ? startPoint : paths[paths.length - 1];

        const lat = Number((refPoint.lat + step).toFixed(6));
        const lng = refPoint.lng;

        const coord = {
            lat,
            lng,
        };

        paths.push(coord);
    }

    return paths;
};

export function isWithinDiameter(
    checkPoint: google.maps.LatLngLiteral,
    centerPoint: google.maps.LatLngLiteral | null,
    meter: number
): boolean | null {
    if (centerPoint == null) {
        return null;
    }
    const ky = 40000 / 360;
    const kx = Math.cos((Math.PI * centerPoint.lat) / 180.0) * ky;
    const dx = Math.abs(centerPoint.lng - checkPoint.lng) * kx;
    const dy = Math.abs(centerPoint.lat - checkPoint.lat) * ky;
    return Math.sqrt(dx * dx + dy * dy) <= meter / 1000;
};


export function isCoordinates(text: string | null): boolean {
    if (!text) {
        return false;
    }

    return /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/.test(
        text
    );
};
