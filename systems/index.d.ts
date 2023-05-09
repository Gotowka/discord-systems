/**
 * Create the lyric class
 */
 declare class lyric {
    readonly data: lyric
    constructor(data?: lyric);
    /**
     * Search the music
     * @param music - The song title
    */
   search(music: string): this;
}

/**
 * Create the tvpis image
 */
declare class Tvpis {
    readonly data: Tvpis
    constructor(data?: Tvpis);
    send(): this;
    reply(): this;
}
/**
 * Create the levelRank image
 */
declare class levelRank {
    readonly data: levelRank
    constructor(data?: levelRank);
    send(): this;
    reply(): this;
}
/**
 * Create the joinCard
 */
declare class joinCard {
    readonly data: joinCard
    constructor(data?: joinCard);
    send(): this;
}
/**
 * Create the leaveCard
 */
 declare class leaveCard {
    readonly data: leaveCard
    constructor(data?: leaveCard);
    send(): this;
}
/**
 * Create the Triggered image
 */
 declare class Triggered {
    readonly data: Triggered
    constructor(data?: Triggered);
    send(): this;
    reply(): this;
}
/**
 * Create the Suggests systems
 */
 declare class Suggests {
    readonly data: Suggests
    constructor(data?: Suggests);
    start(): this;
}
/**
 * Create the Suggests no systems
 */
declare class SuggestsNo {
    readonly data: SuggestsNo
    constructor(data?: SuggestsNo);
    start(): this;  
}
/**
 * Create the Suggests yes systems
 */
 declare class SuggestsYes {
    readonly data: SuggestsYes
    constructor(data?: SuggestsYes);
    start(): this;  
}