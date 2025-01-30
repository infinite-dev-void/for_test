import fastify from "./../../fastify.js";
import { authn, authr, ADMIN, DATA_ENTRY } from "./../security/mod.js";
import path from "node:path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    /**
     * @type {import("fastify").RouteHandlerMethod}
     */
    handler: async function (request, reply) {
        const body = request.body;

        const message = validate_body(body);
        if (typeof message == "string") {
            return reply.status(400).send({
                message: message,
            });
        }

        try {
            const buffer = Buffer.from(body.passport_image.data, "base64");
            const upload_path = path.join(__dirname, "../../public/images");

            const file_name =
                "passport_" +
                body.immigrant_name +
                "_" +
                Date.now().toString() +
                "." +
                body.passport_image.extn;

            body.passport_image = file_name;

            fs.writeFileSync(upload_path + "/" + file_name, buffer);

            await fastify.mysql.query(
                `INSERT INTO fms_surveys (researcher_name, interview_date, personal_consent_interview, municipality, mahalla, site_classif, pre_share, immigrant_name, passport_no, passport_image, nationality, origin_city_loc, gender, age, marital_status, wife_name, children_num, resident_relatives, native_lang, education_highest_level, attending_religious_school, previous_employment_status, current_employment_status, type_of_employment, income_activities_number, last_30_days_profit, profession, employment_contract_agreement, time_to_get_job, job_satisfaction_level, work_risks, way_to_get_job, leave_home_country, arrival, trip_cost, highest_cost, how_paid, travel_companions, minors_without_families, women, companions_type, travel_means, use_facilitators, facilitator_cost, migration_path, first_country, second_country, most_used_transportation, how_get_in, first_city, most_lived_city, leaving_reasons, first_leaving_reason, regular_travel_home, last_year_family_shocks, immigration_supporter, risk_awareness, forced_to_move, target_country, goal_achieving_probability, city_foreknowledge, choosing_reason, saying_express_me, other_plans, immigration_plans_intention, work_license, license_obtain_intention, have_residence, residence_obtain_intention, home_visit_plan, no_home_visit_reasons, post_migration_deportation, notes, previous_money_transfers, three_main_difficulties, living_conditions_agreement, house_nature, room_participants_number, housing_cost, non_food_needs, family_children, family_children_age, family_children_eductable, family_children_eductless_reasons, enough_water, water_source, water_distance, bathroom_participants_number, water_supply_continuity, health_access, not_reaching_health_reasong, public_information_reliability, intent_information_reliability) VALUES (
                    ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);`,
                [
                    body.researcher_name,
                    body.interview_date,
                    body.personal_consent_interview,
                    body.municipality,
                    body.mahalla,
                    body.site_classif,
                    body.pre_share,
                    body.immigrant_name,
                    body.passport_no,
                    body.passport_image,
                    body.nationality,
                    body.origin_city_loc,
                    body.gender,
                    body.age,
                    body.marital_status,
                    body.wife_name,
                    body.children_num,
                    body.resident_relatives,
                    body.native_lang,
                    body.education_highest_level,
                    body.attending_religious_school,
                    body.previous_employment_status,
                    body.current_employment_status,
                    body.type_of_employment,
                    body.income_activities_number,
                    body.last_30_days_profit,
                    body.profession,
                    body.employment_contract_agreement,
                    body.time_to_get_job,
                    body.job_satisfaction_level,
                    body.work_risks,
                    body.way_to_get_job,
                    body.leave_home_country,
                    body.arrival,
                    body.trip_cost,
                    body.highest_cost,
                    body.how_paid,
                    body.travel_companions,
                    body.minors_without_families,
                    body.women,
                    body.companions_type,
                    body.travel_means,
                    body.use_facilitators,
                    body.facilitator_cost,
                    body.migration_path,
                    body.first_country,
                    body.second_country,
                    body.most_used_transportation,
                    body.how_get_in,
                    body.first_city,
                    body.most_lived_city,
                    body.leaving_reasons,
                    body.first_leaving_reason,
                    body.regular_travel_home,
                    body.last_year_family_shocks,
                    body.immigration_supporter,
                    body.risk_awareness,
                    body.forced_to_move,
                    body.target_country,
                    body.goal_achieving_probability,
                    body.city_foreknowledge,
                    body.choosing_reason,
                    body.saying_express_me,
                    body.other_plans,
                    body.immigration_plans_intention,
                    body.work_license,
                    body.license_obtain_intention,
                    body.have_residence,
                    body.residence_obtain_intention,
                    body.home_visit_plan,
                    body.no_home_visit_reasons,
                    body.post_migration_deportation,
                    body.notes,
                    body.previous_money_transfers,
                    body.three_main_difficulties,
                    body.living_conditions_agreement,
                    body.house_nature,
                    body.room_participants_number,
                    body.housing_cost,
                    /* body.eviction_threat,
                    body.eviction_threat_source,
                    body.eviction_threat_reason, */
                    body.non_food_needs,
                    body.family_children,
                    body.family_children_age,
                    body.family_children_eductable,
                    body.family_children_eductless_reasons,
                    body.enough_water,
                    body.water_source,
                    body.water_distance,
                    body.bathroom_participants_number,
                    body.water_supply_continuity,
                    body.health_access,
                    body.not_reaching_health_reasong,
                    body.public_information_reliability,
                    body.intent_information_reliability,
                ]
            );
        } catch (err) {
            fastify.log.error(err);
            return reply.status(500).send({
                message: "خطأ داخلي في الخادم",
            });
        }

        return reply.status(200).send();
    },
    /**
     * @type {import("fastify").RouteOptions}
     */
    opts: {
        schema: {
            body: {
                type: "object",
            },
        },
        preHandler: [authn, authr([ADMIN, DATA_ENTRY])],
    },
};

function validate_body(body) {
    if (
        typeof body.researcher_name != "string" ||
        body.researcher_name === ""
    ) {
        return "يرجى تعبئة حقل اسم الباحث";
    }
    if (typeof body.interview_date != "string" || body.interview_date === "") {
        return "يرجى تعبئة حقل تاريخ المقابلة";
    }
    if (typeof body.personal_consent_interview != "number") {
        return "يرجى تعبئة حقل الحصول على الموافقة الشخصية";
    }
    if (typeof body.municipality != "string" || body.municipality === "") {
        return "يرجى تعبئة حقل البلدية";
    }
    if (typeof body.mahalla != "string" || body.mahalla === "") {
        return "يرجى تعبئة حقل المحلة";
    }
    if (typeof body.site_classif != "number") {
        return "يرجى تحديد تصنيف الموقع";
    }
    if (typeof body.pre_share != "number") {
        return "يرجى تحديد خيار المشاركة المسبقة";
    }

    if (typeof body.immigrant_name != "string") {
        return "يرجى تعبئة حقل اسم المهاجر";
    }

    if (typeof body.passport_no != "string") {
        return "يرجى تعبئة حقل رقم جواز السفر";
    }

    if (typeof body.passport_image != "object") {
        return "يرجى ارفاق صورة جواز السفر";
    }

    const f_type = body.passport_image.type;
    if (typeof f_type != "string") {
        return "يرجى ارفاق صورة جواز السفر";
    }

    if (!f_type.startsWith("image")) {
        return "يجب أن يكون الملف عبارة عن صورة";
    }

    const extn = f_type.split("/")[1];

    if (!["png", "jpg", "jpeg"].includes(extn)) {
        return "يجب أن تكون الصورة بامتداد: png أو jpg أو jpeg";
    }

    if (typeof body.passport_image.data != "string") {
        return "يرجى ارفاق صورة جواز السفر";
    }

    if (typeof body.nationality != "string" || body.nationality === "") {
        return "يرجى تعبئة حقل الجنسية";
    }
    if (
        typeof body.origin_city_loc != "string" ||
        body.origin_city_loc === ""
    ) {
        return "يرجى تعبئة الحقل المدينة الموقع من بلد الأصل";
    }
    if (typeof body.gender != "number") {
        return "يرجى تحديد الجنس";
    }
    if (typeof body.age != "number") {
        return "يرجى تعبئة حقل العمر";
    }
    if (typeof body.marital_status != "number") {
        return "يرجى تحديد الحالة الإجتماعية";
    }
    if (typeof body.resident_relatives != "number") {
        return "يرجى تحديد ما إذا كان فرد من العائلة في ليبيا";
    }
    if (typeof body.native_lang != "string" || body.native_lang === "") {
        return "يرجى تعبئة حقل اللغة الأم";
    }
    if (typeof body.education_highest_level != "number") {
        return "يرجى تحديد أعلى مستوى تعليمي أنهيته";
    }
    if (typeof body.attending_religious_school != "number") {
        return "يرجى تحديد ارتياد مدرسة دينية";
    }
    if (typeof body.previous_employment_status != "number") {
        return "يرجى تحديد الحالة الوظيفية السابقة";
    }
    if (typeof body.current_employment_status != "number") {
        return "يرجى تحديد الحالة الوظيفية الحالية";
    }
    if (typeof body.type_of_employment != "number") {
        return "يرجى تحديد ما إذا كنت تعمل";
    }
    if (typeof body.income_activities_number != "number") {
        return "يرجى تعبئة حقل الأنشطة المدرة للدخل";
    }
    if (typeof body.last_30_days_profit != "number") {
        return "يرجلى تعبئة حقل كسب آخر 30 يوما";
    }
    if (typeof body.profession != "string" || body.profession === "") {
        return "يرجى تعبة حقل المهنة";
    }
    if (typeof body.employment_contract_agreement != "number") {
        return "يرجى تحديد ما إذا لديك عقد أو اتفاق عمل";
    }
    if (typeof body.time_to_get_job != "number") {
        return "يرجى تحديد وقت الحصول على وظيفة";
    }
    if (typeof body.job_satisfaction_level != "number") {
        return "يرجى تحديد مستوى الرضا عن العمل";
    }
    if (typeof body.work_risks != "string" || body.work_risks === "") {
        return "يرجى تحديد المخاطر الرئيسية في عملك";
    }
    if (typeof body.way_to_get_job != "string" || body.way_to_get_job === "") {
        return "يرجى تحديد كيفية الحصول على العمل";
    }
    if (
        typeof body.leave_home_country != "string" ||
        body.leave_home_country === ""
    ) {
        return "يرجى تعبئة حقل تاريخ ترك بلد المغادرة";
    }
    if (typeof body.arrival != "string" || body.arrival === "") {
        return "يرجى تعبئة حقل تاريخ الوصول إلى ليبيا";
    }
    if (typeof body.trip_cost != "number") {
        return "يرجى تعبئة حقل تكلفة الرحلة";
    }
    if (typeof body.highest_cost != "string" || body.highest_cost === "") {
        return "يرجى تحديد على ماذا تم إنفاق أكبر مبلغ";
    }
    if (typeof body.how_paid != "string" || body.how_paid === "") {
        return "يرجى تحديد كيف دفعت تكاليف سفرك";
    }
    if (typeof body.travel_companions != "number") {
        return "يرجى تحديد مع من وصلت إلى ليبيا";
    }
    if (typeof body.travel_means != "number") {
        return "يرجى تحديد وسيلة النقل";
    }
    if (typeof body.use_facilitators != "number") {
        return "يرجى تحديد ما إذا استعنت بمسير";
    }
    if (typeof body.migration_path != "string" || body.migration_path === "") {
        return "يرجى تعبئة حقل مسار الهجرة";
    }
    if (typeof body.first_country != "string" || body.first_country === "") {
        return "يرجى تعبئة حقل نقطة البداية: بلد المنشأ";
    }
    if (typeof body.second_country != "string" || body.second_country === "") {
        return "يرجى تعبئة حقل البلد: 2";
    }
    if (typeof body.most_used_transportation != "number") {
        return "يرجى تحديد وسيلة النقل الرئيسية";
    }
    if (typeof body.how_get_in != "number") {
        return "يرجى تحديد كيفية دخولك إلى ليبيا";
    }
    if (typeof body.first_city != "string" || body.first_city === "") {
        return "يرجى تعبئة حقل المدينة التي قضيت فيها أول ليلة";
    }
    if (
        typeof body.most_lived_city != "string" ||
        body.most_lived_city === ""
    ) {
        return "يرجى تعبئة حقل أي مدينة فضيت فيها أكثر من أسبوع";
    }
    if (
        typeof body.leaving_reasons != "string" ||
        body.leaving_reasons === ""
    ) {
        return "يرجى تعبئة حقل أسباب مغادرة بلدك الأصلي";
    }
    if (
        typeof body.first_leaving_reason != "string" ||
        body.first_leaving_reason === ""
    ) {
        return "يرجى تعبئة حقل سبب المغادرة الأول";
    }
    if (typeof body.regular_travel_home != "number") {
        return "يرجى تحديد هل تسافر إلى بلدك بإنتظام";
    }
    if (typeof body.last_year_family_shocks != "number") {
        return "يرجى ماإذا كانت عائلتك عانت من صدمات";
    }
    if (typeof body.immigration_supporter != "number") {
        return "يرجى تحديد من شجعك على الهجرة";
    }
    if (typeof body.risk_awareness != "number") {
        return "يرجى تحديد ما إذا كنت واعيا بمخاطر الهجرة";
    }
    if (typeof body.forced_to_move != "number") {
        return "يرجى تحديد ما إذا كنت قد أجبرت على النزوح";
    }
    if (typeof body.target_country != "number") {
        return "يرجى تحديد البلد الذي كنت تنوي الوصول إليه";
    }
    if (typeof body.goal_achieving_probability != "number") {
        return "يرجى تحديد احتمالية أن تكون في وجهتك خلال سنة";
    }
    if (typeof body.city_foreknowledge != "number") {
        return "يرجى تحديد ما إذا كنت تعلم المدينة التي ترغب في البقاء فيها";
    }
    if (
        typeof body.choosing_reason != "string" ||
        body.choosing_reason === ""
    ) {
        return "يرجى تحديد سبب اختيارك لهذا البلد";
    }
    if (typeof body.saying_express_me != "number") {
        return "يرجى تحديد الأقوال التي تعبر عن نفسك";
    }
    if (typeof body.other_plans != "string" || body.other_plans === "") {
        return "يرجى تحديد خططك الأخرى";
    }
    if (typeof body.immigration_plans_intention != "number") {
        return "يرجى تحديد نوايا مخططات الهجرة";
    }
    if (typeof body.work_license != "number") {
        return "يرجى تحديد ما إذا كان لديك رخصة عمل";
    }
    if (typeof body.have_residence != "number") {
        return "يرجى تحديد ما إذا لديك إقام";
    }
    if (typeof body.home_visit_plan != "number") {
        return "يرجى تجديد خطط زيارة بلدك";
    }
    if (typeof body.no_home_visit_reasons != "number") {
        return "يرجى تحديد لماذا لا تفكر في العودة إلى الوطن";
    }
    if (typeof body.post_migration_deportation != "number") {
        return "يرجى تحديد ما إذا كان قد تم إعادتك قسرا خلال رحلتك";
    }
    if (typeof body.previous_money_transfers != "number") {
        return "يرجى تحديد هل قمت بإرسال تحويلات مالية";
    }
    if (
        typeof body.three_main_difficulties != "string" ||
        body.three_main_difficulties === ""
    ) {
        return "يرجى تحديد الصعوبات الثلاث الرئيسية في الوقت الحالي";
    }
    if (typeof body.living_conditions_agreement != "number") {
        return "يرجى تحديد مدى إتفاقك على ظروف العيش";
    }
    if (typeof body.house_nature != "number") {
        return "يرجى تحديد طبيعة المسكن الذي تقيم فيه";
    }
    if (typeof body.room_participants_number != "number") {
        return "يرجى تعبئة حقل عدد الأشخاص المشاركين في الغرفة";
    }
    if (typeof body.housing_cost != "number") {
        return "يرجى تعبئة حقل تكلفة المسكن الشهرية";
    }
    /* if (typeof body.eviction_threat != "number") {
        return "يرجى تجديد ما إذا تم تهديدك";
    } */
    if (typeof body.non_food_needs != "string" || body.non_food_needs === "") {
        return "يرجى تحديد المواد الغير غذائية العاجلة";
    }
    if (typeof body.family_children != "number") {
        return "يرجى تحديد ما إذا كان لديك أطفال بين 5 و 18 سنة في ليبيا";
    }

    if (typeof body.enough_water != "number") {
        return "يرجى تحديد ما إذا كانت مياه الشرب كافية";
    }
    if (typeof body.water_source != "string" || body.water_source === "") {
        return "يرجى تحديد مصدر المياه";
    }
    if (typeof body.water_distance != "number") {
        return "يرجى تحديد بعد المياه";
    }
    if (typeof body.bathroom_participants_number != "number") {
        return "يرجى تحديد كم فردا يتشارك في دورة المياه";
    }
    if (typeof body.water_supply_continuity != "number") {
        return "يرجى تحديد استمرارية وصول المياه";
    }
    if (typeof body.health_access != "number") {
        return "يرجى تحديد إمكانية الوصول للخدمات الصحية";
    }
    if (typeof body.public_information_reliability != "number") {
        return "يرجى تحديد مصداقية المعلومات العامة";
    }
    if (typeof body.intent_information_reliability != "number") {
        return "يرجى تحديد مصداقية النوايا";
    }

    body.passport_image.extn = extn;
}
