

export const getEnvironments = () => {

    import.meta.env; //Esto lo carga y ya adelante se puede usar en el return

  return {
    ...import.meta.env
  }
}
