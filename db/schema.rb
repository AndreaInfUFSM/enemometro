# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_09_14_041618) do

  create_table "med2016_cidades", id: false, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "CO_MUNICIPIO_ESC"
    t.string "NO_MUNICIPIO_ESC"
    t.string "SG_UF_ESC"
    t.float "MED"
    t.datetime "created_at", default: "2019-09-04 00:00:00", null: false
    t.datetime "updated_at", default: "2019-09-04 00:00:00", null: false
    t.integer "rank"
    t.integer "id"
  end

  create_table "med2016_escolas", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "CO_ESCOLA"
    t.integer "CO_MUNICIPIO_ESC"
    t.string "NO_MUNICIPIO_ESC"
    t.string "SG_UF_ESC"
    t.float "MED"
    t.string "NO_ESCOLA"
    t.datetime "created_at", default: "2019-09-04 00:00:00", null: false
    t.datetime "updated_at", default: "2019-09-04 00:00:00", null: false
    t.integer "rank"
  end

  create_table "med2017_cidades", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "CO_MUNICIPIO_ESC"
    t.string "NO_MUNICIPIO_ESC"
    t.string "SG_UF_ESC"
    t.float "MED"
    t.datetime "created_at", default: "2019-09-04 00:00:00", null: false
    t.datetime "updated_at", default: "2019-09-04 00:00:00", null: false
    t.integer "rank"
  end

  create_table "med2017_escolas", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "CO_ESCOLA"
    t.integer "CO_MUNICIPIO_ESC"
    t.string "NO_MUNICIPIO_ESC"
    t.string "SG_UF_ESC"
    t.float "MED"
    t.string "NO_ESCOLA"
    t.datetime "created_at", default: "2019-09-04 00:00:00", null: false
    t.datetime "updated_at", default: "2019-09-04 00:00:00", null: false
    t.integer "rank"
  end

end
