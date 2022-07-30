def check_db_integrity(db_cursor) -> bool:
    db_cursor.execute('''
    SELECT EXISTS(
        SELECT * FROM information_schema.tables
        WHERE table_schema = 'tha_site'
        AND table_name = 'users'
    );
    ''')
    print(db_cursor.fetchall())