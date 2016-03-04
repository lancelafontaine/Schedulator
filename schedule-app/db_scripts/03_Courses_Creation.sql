use schedulator;

INSERT INTO courses (course_id, class_type, section, start_time, end_time, days, professor_name, room, prerequisite, semester) 

VALUES ('ENGR213', 'course', 'U', '1145', '1300', '[Wednesday, Friday]', 'professor', 'FGC080', 'none', 'fall'),
('ENGR213', 'tutorial', 'UA', '1415', '1555', 'Friday', 'professor', 'MBS2.115', 'none', 'fall'),
('ENGR213', 'tutorial', 'UB', '1415', '1555', 'Monday', 'professor', 'MB5.256', 'none', 'fall'),
('ENGR213', 'course', 'G', '1445', '1600', '[Tuesday, Thursday]', 'professor', 'H553', 'none', 'winter'),
('ENGR213', 'tutorial', 'GA', '1610', '1750', 'Monday', 'professor', 'FGB080', 'none', 'winter'),
('ENGR213', 'tutorial', 'GB', '1610', '1750', 'Friday', 'professor', 'H423', 'none', 'winter')
;