export interface Plugin {
  register: MaybeAsync<DisposeFn>
}

export interface CommonJSPlugin {
  default: Plugin
}
