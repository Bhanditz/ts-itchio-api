/**
 * An itch.io page, which may be a game or something that isn't a game
 */
export interface Game {
  /** itch.io-generated unique identifier */
  id: number;

  /** date the game was published, or empty/null if not published */
  createdAt: Date;

  /** date the game was published, or empty/null if not published */
  publishedAt: Date;

  /** address of the game's page on itch.io */
  url: string;

  /** unique identifier of the developer this game belongs to */
  userId: number;

  /** human-friendly title (may contain any character) */
  title: string;

  /** human-friendly short description */
  shortText: string;

  /** non-GIF cover url */
  stillCoverUrl: string;

  /** cover url (might be a GIF) */
  coverUrl: string;

  /** downloadable game, html game, etc. */
  type: GameType;

  /** classification: game, tool, comic, etc. */
  classification: GameClassification;

  /** Only present for HTML5 games, otherwise null */
  embed: GameEmbedInfo;

  /** true if the game has a demo that can be downloaded for free */
  hasDemo: boolean;

  /** price of a game, in cents of a dollar */
  minPrice: number;

  /** current sale, if any */
  sale: GameSaleInfo;

  /** as of November 7, 2016, this property doesn't exist yet in the API, but one can dream.. */
  currency: string;

  /** if true, this game is downloadable by press users for free */
  inPressSystem: boolean;

  /** if true, this game accepts money (donations or purchases) */
  canBeBought: boolean;

  /** true if upload is tagged with 'linux compatible' (creator-controlled) */
  pLinux?: boolean;
  /** true if upload is tagged with 'windows compatible' (creator-controlled) */
  pWindows?: boolean;
  /** true if upload is tagged with 'macOS compatible' (creator-controlled) */
  pOsx?: boolean;
  /** true if upload is tagged with 'android compatible' (creator-controlled) */
  pAndroid?: boolean;
}

/**
 * An itch.io page, with additional info only their creator & contributors can see
 */
export interface OwnGame extends Game {
  /** how many times has the page been downloaded (all time) */
  downloadsCount: number;

  /** how many times has the page been purchased (all time) */
  purchasesCount: number;

  /** how many page views has the page gotten (all time) */
  viewsCount: number;
}

/**
 * Type of an itch.io game page, mostly related to
 * how it should be presented on web (downloadable or embed)
 */
export enum GameType {
  // downloadable
  Default = "default",
  // .swf (legacy)
  Flash = "flash",
  // .unity3d (legacy)
  Unity = "unity",
  // .jar (legacy)
  Java = "java",
  // .html (thriving)
  HTML = "html",
}

/**
 * Discount info, useful to compute actual price
 */
export interface GameSaleInfo {
  /** numeric identifier for the sale */
  id: number;

  /** discount percentage in [0,100] */
  rate: number;
}

/**
 * Creator-picked classification for a page
 */
export enum GameClassification {
  /** something you can play */
  Game = "game",
  /** all software pretty much */
  Tool = "tool",
  /** assets: graphics, sounds, etc. */
  Assets = "assets",
  /** game mod (no link to game, purely creator tagging) */
  GameMod = "game_mod",
  /** printable / board / card game */
  PhysicalGame = "physical_game",
  /** bunch of music files */
  Soundtrack = "soundtrack",
  /** anything that creators think don't fit in any other category */
  Other = "other",
  /** comic book (pdf, jpg, specific comic formats, etc.) */
  Comic = "comic",
  /** book (pdf, jpg, specific e-book formats, etc.) */
  Book = "book",
}

/**
 * Presentation information for embed games
 */
export interface GameEmbedInfo {
  /** width of the initial viewport, in pixels */
  width: number;

  /** height of the initial viewport, in pixels */
  height: number;

  /** for itch.io website, whether or not a fullscreen button should be shown */
  fullscreen: boolean;
}

/**
 * A user on the itch.io website
 */
export interface User {
  /* site-wide unique identifier generated by itch.io */
  id: number;

  /** the user's username */
  username: string;

  /** the user's display name */
  displayName: string;

  /** the canonical address of the game's page */
  url: string;

  /** user's avatar, may be a gif */
  coverUrl: string;

  /** user's avatar static version, only if coverUrl is a gif */
  stillCoverUrl: string;
}

/**
 * An itch.io user, with extra information (returned by /me endpoint)
 */
export interface OwnUser extends User {
  /**
   * if set, user owns press account.
   * note to reader: don't bother faking it locally — the server won't let you download
   * anything if you don't actually have a press account. Or maybe you're just looking for
   * fun errors, in which case, go ahead!
   */
  pressUser: boolean;

  /** if set, user has expressed interest in publishing content on itch.io */
  developer: boolean;
}

/**
 * An itch.io upload is tied to a game page. It can be either:
 *   - A traditional upload - contents remain the same for a given upload ID
 *   - A wharf-enabled upload - any number of builds can be pushed
 *   - An external upload (hopefully soon deprecated) - it just points to
 *   an URL. The contents can change at any point. We have no way to reliably
 *   resume (since the file may have changed). Besides, there's no guarantee
 *   the external HTTP server supports range requests, or serves the file
 *   directly (Mediafire etc.)
 */
export interface Upload {
  /** unique numeric identifier generated by itch.io */
  id: number;

  /** when the upload was created */
  createdAt: Date;

  /** when the upload was last updated */
  updatedAt: Date;

  /** name of the uploaded file - null for external uploads */
  filename?: string;

  /** user-friendly name for the upload, set by developer */
  displayName?: string;

  /** executable, embed, or bonus content, see enum values */
  type: UploadType;

  /**
   * the size of this upload, in bytes.
   * for wharf-enabled uploads, it's the latest archive size.
   */
  size?: number;

  /** true if this upload is a demo and can be downloaded for free */
  demo?: boolean;

  /** true if this is a pre-order placeholder and cannot be downloaded */
  preorder?: boolean;

  /** true if upload is tagged with 'linux compatible' (creator-controlled) */
  pLinux?: boolean;
  /** true if upload is tagged with 'windows compatible' (creator-controlled) */
  pWindows?: boolean;
  /** true if upload is tagged with 'macOS compatible' (creator-controlled) */
  pOsx?: boolean;
  /** true if upload is tagged with 'android compatible' (creator-controlled) */
  pAndroid?: boolean;

  //==================================================
  // fields for wharf-enabled uploads
  //==================================================

  /** for wharf-enabled upload, identifier of the latest build (at the time of the request) */
  buildId: number;

  /** for wharf-enabled upload, info of the latest build (at the time of the request) */
  build: Build;

  /**
   * For wharf-enabled upload, which channel it corresponds to.
   * See https://itch.io/docs/butler/pushing.html#channel-names
   * Note: don't use this for platform info, use `pLinux` etc. instead.
   */
  channelName: string;
}

export enum UploadType {
  // shown as 'executable' in itch.io creator UI
  Default = "default",

  //==================================================
  // embed types
  //==================================================

  // .swf files shown in browser (legacy)
  Flash = "flash",
  // .unity3d files shown in unity browser plug-in (legacy)
  Unity = "unity",
  // .jar files shown as Java applets (legacy)
  Java = "java",
  // HTML5 games  shown in browser
  HTML = "html",

  //==================================================
  // embed types
  //==================================================

  // usually a bunch of .ogg/.flac/.mp3/.m4a
  Soundtrack = "soundtrack",
  Other = "other",
}

/** 
 * A wharf-enabled upload is a chain of builds. Each build is the child
 * of the previous build and patches can only be applied sequentially.
 * One could say a `build` is a `version` of a wharf-enabled upload.
 */
export interface Build {
  /** unique itch.io identifier for build */
  id: number;

  /** if not root build, ID of the parent build (previous in the chain) */
  parentBuildId?: number;

  /** when the build was created */
  createdAt: Date;

  /** when the build was last updated */
  updatedAt: Date;

  /** user who pushed this particular build */
  user?: User;

  /** itch.io-generated version number */
  version: number;

  /** creator-provided version number */
  userVersion: string;

  files?: BuildFile[];
}

export interface BuildFile {
  /** type of the build file */
  type: BuildFileType;

  /** subtype of the build file (type wasn't enough) */
  subType: BuildFileSubType;

  /** when the build file was created */
  createdAt: Date;

  /** when the build file was last updated */
  updatedAt: Date;
}

export enum BuildFileType {
  // series of hashes to verify integrity
  Signature = "signature",

  // instructions to upgrade from one build to the next
  Patch = "patch",

  // contents of a build, independent of any other (canonically, .zip archive)
  Archive = "archive",

  // reserved
  Manifest = "manifest",

  // for single-file pushes, the single file, uncompresed
  Unpacked = "unpacked",
}

export enum BuildFileSubType {
  // brotli q1
  Default = "default",

  // reserved
  Gzip = "gzip",

  // rediff'd patches, zstd-q9
  Optimized = "optimized",

  // reserved
  Accelerated = "accelerated",
}
