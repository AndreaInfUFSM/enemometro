class CreateMed2014Cidades < ActiveRecord::Migration[5.2]
  def change
    create_table :med2014_cidades do |t|
      t.integer :CO_MUNICIPIO_ESC
      t.string :NO_MUNICIPIO_ESC
      t.string :SG_UF_ESC
      t.float :MED
      t.integer :rank

      t.timestamps
    end
  end
end
