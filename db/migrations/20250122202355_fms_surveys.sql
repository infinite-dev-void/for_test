-- migrate:up
CREATE TABLE fms_surveys (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    researcher_name VARCHAR(255) NOT NULL,
    interview_date DATE NOT NULL,
    personal_consent_interview BOOLEAN NOT NULL,
    municipality TEXT NOT NULL,
    mahalla TEXT NOT NULL,
    site_classif TINYINT NOT NULL,
    pre_share BOOLEAN NOT NULL,
    immigrant_name TEXT NOT NULL,
    passport_no TEXT NOT NULL,
    passport_image TEXT NOT NULL,
    nationality TEXT NOT NULL,
    origin_city_loc TEXT NOT NULL,
    gender TINYINT NOT NULL,
    age INT NOT NULL,
    marital_status TINYINT NOT NULL,
    wife_name TEXT,
    children_num TEXT,
    resident_relatives BOOLEAN NOT NULL,
    native_lang TEXT NOT NULL,
    education_highest_level TINYINT NOT NULL,
    attending_religious_school BOOLEAN NOT NULL,
    previous_employment_status TINYINT NOT NULL,
    current_employment_status TINYINT NOT NULL,
    type_of_employment TINYINT NOT NULL,
    income_activities_number INT NOT NULL,
    last_30_days_profit INT NOT NULL,
    profession TEXT NOT NULL,
    employment_contract_agreement TINYINT NOT NULL,
    time_to_get_job TINYINT NOT NULL,
    job_satisfaction_level TINYINT NOT NULL,
    work_risks TEXT NOT NULL,
    way_to_get_job TEXT NOT NULL,
    leave_home_country DATE NOT NULL,
    arrival DATE NOT NULL,
    trip_cost INT NOT NULL,
    highest_cost TEXT NOT NULL,
    how_paid TEXT NOT NULL,
    travel_companions TINYINT NOT NULL,
    minors_without_families INT,
    women INT,
    companions_type TEXT,
    travel_means TINYINT NOT NULL,
    use_facilitators TINYINT NOT NULL,
    facilitator_cost INT,
    migration_path TEXT NOT NULL,
    first_country TEXT NOT NULL,
    second_country TEXT NOT NULL,
    most_used_transportation TINYINT NOT NULL,
    how_get_in TINYINT NOT NULL,
    first_city TEXT NOT NULL,
    most_lived_city TEXT NOT NULL,
    leaving_reasons TEXT NOT NULL,
    first_leaving_reason TEXT NOT NULL,
    regular_travel_home TINYINT NOT NULL,
    last_year_family_shocks BOOLEAN NOT NULL,
    immigration_supporter TINYINT NOT NULL,
    risk_awareness BOOLEAN NOT NULL,
    forced_to_move TINYINT NOT NULL,
    target_country TINYINT NOT NULL,
    goal_achieving_probability TINYINT NOT NULL,
    city_foreknowledge TINYINT NOT NULL,
    choosing_reason TEXT NOT NULL,
    saying_express_me TINYINT NOT NULL,
    other_plans TEXT NOT NULL,
    immigration_plans_intention TINYINT NOT NULL,
    work_license BOOLEAN NOT NULL,  
    license_obtain_intention BOOLEAN,
    have_residence BOOLEAN NOT NULL,
    residence_obtain_intention BOOLEAN,
    home_visit_plan TINYINT NOT NULL,
    no_home_visit_reasons TINYINT NOT NULL,
    post_migration_deportation TINYINT NOT NULL,
    notes TEXT,
    previous_money_transfers TINYINT NOT NULL,
    three_main_difficulties TEXT NOT NULL,
    living_conditions_agreement TINYINT NOT NULL,
    house_nature TINYINT NOT NULL,
    room_participants_number INT NOT NULL,
    housing_cost INT NOT NULL,
    /* eviction_threat TINYINT NOT NULL,
    eviction_threat_source TEXT,
    eviction_threat_reason TEXT, */
    non_food_needs TEXT NOT NULL,
    family_children BOOLEAN NOT NULL,
    family_children_age TINYINT,
    family_children_eductable BOOLEAN,
    family_children_eductless_reasons TEXT,
    enough_water BOOLEAN NOT NULL,
    water_source TEXT NOT NULL,
    water_distance TINYINT NOT NULL,
    bathroom_participants_number TINYINT NOT NULL,
    water_supply_continuity TINYINT NOT NULL,
    health_access TINYINT NOT NULL,
    not_reaching_health_reasong TEXT,
    public_information_reliability TINYINT NOT NULL,
    intent_information_reliability TINYINT NOT NULL
);

-- migrate:down
DROP TABLE fms_surveys;

