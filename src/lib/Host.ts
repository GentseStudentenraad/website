export enum Host {
    GSR = "gentsestudentenraad.be",
    PPSR = "ppsr.gentsestudentenraad.be",
    FRIS = "fris.gentsestudentenraad.be",
    STURA = "stura.gentsestudentenraad.be",
    STUART = "stuart.gentsestudentenraad.be",
    LOCALHOST = "localhost",
    // @ts-ignore
    UNKNOWN = undefined,
}

export function getHost(hostname: string) : Host {
    for (const host in Host) {
        // @ts-ignore
        const potentialHostname = Host[host] as string;
        if (potentialHostname === hostname) {
            return Host[host as keyof typeof Host];
        }
    }
    return Host.UNKNOWN
}
