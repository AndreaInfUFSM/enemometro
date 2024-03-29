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

ActiveRecord::Schema.define(version: 2019_09_22_060057) do

  create_table "med2013_cidades", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "CO_MUNICIPIO_ESC"
    t.string "NO_MUNICIPIO_ESC"
    t.string "SG_UF_ESC"
    t.float "MED"
    t.integer "rank"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "med2013_escolas", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "CO_ESCOLA"
    t.integer "CO_MUNICIPIO_ESC"
    t.string "NO_MUNICIPIO_ESC"
    t.string "SG_UF_ESC"
    t.float "MED"
    t.integer "rank"
    t.string "NO_ESCOLA"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "med2014_cidades", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "CO_MUNICIPIO_ESC"
    t.string "NO_MUNICIPIO_ESC"
    t.string "SG_UF_ESC"
    t.float "MED"
    t.integer "rank"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "med2014_escolas", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "CO_ESCOLA"
    t.integer "CO_MUNICIPIO_ESC"
    t.string "NO_MUNICIPIO_ESC"
    t.string "SG_UF_ESC"
    t.float "MED"
    t.integer "rank"
    t.string "NO_ESCOLA"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "med2015_cidades", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "CO_MUNICIPIO_ESC"
    t.string "NO_MUNICIPIO_ESC"
    t.string "SG_UF_ESC"
    t.float "MED"
    t.integer "rank"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "med2015_escolas", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "CO_ESCOLA"
    t.integer "CO_MUNICIPIO_ESC"
    t.string "NO_MUNICIPIO_ESC"
    t.string "SG_UF_ESC"
    t.float "MED"
    t.integer "rank"
    t.string "NO_ESCOLA"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "med2016_cidades", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "CO_MUNICIPIO_ESC"
    t.string "NO_MUNICIPIO_ESC"
    t.string "SG_UF_ESC"
    t.float "MED"
    t.integer "rank"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "med2016_escolas", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "CO_ESCOLA"
    t.integer "CO_MUNICIPIO_ESC"
    t.string "NO_MUNICIPIO_ESC"
    t.string "SG_UF_ESC"
    t.float "MED"
    t.integer "rank"
    t.string "NO_ESCOLA"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "med2017_cidades", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "CO_MUNICIPIO_ESC"
    t.string "NO_MUNICIPIO_ESC"
    t.string "SG_UF_ESC"
    t.float "MED"
    t.integer "rank"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "med2017_escolas", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "CO_ESCOLA"
    t.integer "CO_MUNICIPIO_ESC"
    t.string "NO_MUNICIPIO_ESC"
    t.string "SG_UF_ESC"
    t.float "MED"
    t.integer "rank"
    t.string "NO_ESCOLA"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "med2018_cidades", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "CO_MUNICIPIO_ESC"
    t.string "NO_MUNICIPIO_ESC"
    t.string "SG_UF_ESC"
    t.float "MED"
    t.integer "rank"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "med2018_escolas", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "CO_ESCOLA"
    t.integer "CO_MUNICIPIO_ESC"
    t.string "NO_MUNICIPIO_ESC"
    t.string "SG_UF_ESC"
    t.float "MED"
    t.integer "rank"
    t.string "NO_ESCOLA"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
