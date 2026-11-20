"""Initialize or migrate the SQLite database for 50-state 2026 State Legislative TikTok videos."""

import pathlib
import sqlite3

BASE_DIR = pathlib.Path(__file__).resolve().parent
DATA_DIR = BASE_DIR / "data"
DB_PATH = DATA_DIR / "ca_2026_tiktok.db"

SCHEMA_SQL = """
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS candidates (
    candidate_id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT NOT NULL,
    state TEXT NOT NULL DEFAULT 'CA',
    chamber TEXT NOT NULL CHECK (chamber IN ('Assembly', 'Senate', 'House', 'Upper', 'Lower')),
    district TEXT NOT NULL,
    party TEXT,
    incumbent_status TEXT CHECK (incumbent_status IN ('Incumbent', 'Challenger', 'Unknown')) DEFAULT 'Unknown',
    ballot_designation TEXT,
    campaign_url TEXT,
    ballotpedia_url TEXT,
    UNIQUE(full_name, state, chamber, district)
);

CREATE TABLE IF NOT EXISTS tiktok_accounts (
    account_id INTEGER PRIMARY KEY AUTOINCREMENT,
    candidate_id INTEGER NOT NULL REFERENCES candidates(candidate_id) ON DELETE CASCADE,
    tiktok_handle TEXT NOT NULL,
    profile_url TEXT NOT NULL,
    account_type TEXT CHECK (account_type IN ('official', 'campaign', 'personal', 'unknown')) DEFAULT 'unknown',
    discovery_source TEXT,
    follower_count INTEGER,
    last_checked_at TEXT,
    UNIQUE(candidate_id, tiktok_handle)
);

CREATE TABLE IF NOT EXISTS videos (
    video_id TEXT PRIMARY KEY,
    account_id INTEGER NOT NULL REFERENCES tiktok_accounts(account_id) ON DELETE CASCADE,
    candidate_id INTEGER NOT NULL REFERENCES candidates(candidate_id) ON DELETE CASCADE,
    tiktok_url TEXT NOT NULL,
    posted_at TEXT,
    in_campaign_window INTEGER NOT NULL DEFAULT 0,
    caption TEXT,
    hashtags TEXT,
    duration_sec INTEGER,
    sound_title TEXT,
    sound_author TEXT,
    is_original_sound INTEGER,
    views INTEGER,
    likes INTEGER,
    comments INTEGER,
    shares INTEGER,
    collected_at TEXT NOT NULL
);

DROP VIEW IF EXISTS student_coding_view;
CREATE VIEW student_coding_view AS
SELECT
    v.video_id,
    v.tiktok_url,
    c.state,
    c.chamber,
    c.district,
    c.full_name AS candidate_name,
    c.party,
    c.incumbent_status,
    a.tiktok_handle,
    a.account_type,
    v.posted_at,
    v.duration_sec,
    v.caption,
    v.hashtags,
    v.sound_title,
    v.is_original_sound,
    v.views,
    v.likes,
    v.comments,
    v.shares
FROM videos v
JOIN tiktok_accounts a ON v.account_id = a.account_id
JOIN candidates c ON v.candidate_id = c.candidate_id
WHERE v.in_campaign_window = 1
ORDER BY c.state, c.chamber, c.district, c.full_name, v.posted_at;
"""


def migrate_if_needed(conn: sqlite3.Connection) -> None:
    """If an older CA-only candidates table exists without `state`, migrate it in-place."""
    cols = {r[1] for r in conn.execute("PRAGMA table_info(candidates)").fetchall()}
    if not cols or "state" in cols:
        return

    conn.executescript(
        """
        PRAGMA foreign_keys = OFF;
        ALTER TABLE candidates RENAME TO candidates_old;
        CREATE TABLE candidates (
            candidate_id INTEGER PRIMARY KEY AUTOINCREMENT,
            full_name TEXT NOT NULL,
            state TEXT NOT NULL DEFAULT 'CA',
            chamber TEXT NOT NULL CHECK (chamber IN ('Assembly', 'Senate', 'House', 'Upper', 'Lower')),
            district TEXT NOT NULL,
            party TEXT,
            incumbent_status TEXT CHECK (incumbent_status IN ('Incumbent', 'Challenger', 'Unknown')) DEFAULT 'Unknown',
            ballot_designation TEXT,
            campaign_url TEXT,
            ballotpedia_url TEXT,
            UNIQUE(full_name, state, chamber, district)
        );
        INSERT INTO candidates (candidate_id, full_name, state, chamber, district, party, incumbent_status, ballot_designation, campaign_url, ballotpedia_url)
        SELECT candidate_id, full_name, 'CA', chamber, CAST(district AS TEXT), party, incumbent_status, ballot_designation, campaign_url, ballotpedia_url
        FROM candidates_old;
        DROP TABLE candidates_old;
        PRAGMA foreign_keys = ON;
        """
    )


def init_database(db_path: pathlib.Path = DB_PATH) -> pathlib.Path:
    """Create the data directory and initialize/migrate all tables and views."""
    db_path.parent.mkdir(parents=True, exist_ok=True)
    with sqlite3.connect(db_path) as conn:
        migrate_if_needed(conn)
        conn.executescript(SCHEMA_SQL)
    return db_path


if __name__ == "__main__":
    path = init_database()
    print(f"Initialized database at {path}")
