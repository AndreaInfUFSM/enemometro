class Droptables < ActiveRecord::Migration[5.2]
  def change
	drop_table :med_cidades
	drop_table :med_escolas
  end
end
