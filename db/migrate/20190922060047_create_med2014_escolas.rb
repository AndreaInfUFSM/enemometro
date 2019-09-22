class CreateMed2014Escolas < ActiveRecord::Migration[5.2]
  def change
    create_table :med2014_escolas do |t|
      t.integer :CO_ESCOLA
      t.integer :CO_MUNICIPIO_ESC
      t.string :NO_MUNICIPIO_ESC
      t.string :SG_UF_ESC
      t.float :MED
      t.integer :rank
      t.string :NO_ESCOLA

      t.timestamps
    end
  end
end
